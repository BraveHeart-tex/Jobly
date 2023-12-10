"use client";
import {
  DateSelectArg,
  EventAddArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
  EventRemoveArg,
  EventSourceInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FormEvent, useRef, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGenericConfirm } from "@/app/contexts/GenericConfirmContext";
import { FiEdit, FiX } from "react-icons/fi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { createGenericWithCurrentUser, deleteGeneric, updateGeneric } from "@/lib/generic";
import { Event } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const EventCalendar = ({ userEvents }: { userEvents: Event[] }) => {
  let [isPending, startTransition] = useTransition();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(userEvents);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { showGenericConfirm } = useGenericConfirm();
  const title = useRef<HTMLInputElement>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setShowForm(true);
    setSelectInfo(selectInfo);
  };

  const handleEventAdd = (data: EventAddArg) => {
    startTransition(async () => {
      const result = await createGenericWithCurrentUser<Event>({
        tableName: "event",
        data: {
          title: data.event.title,
          start: data.event.start || new Date(),
          end: data.event.end || new Date(),
          allDay: data.event.allDay,
        },
      });

      if (!result?.error) {
        const newEvent = result?.data;
        if (newEvent) {
          setEvents([...events, newEvent]);
        }
      }
    });
  };

  const handleEventChange = (data: EventChangeArg) => {
    startTransition(async () => {
      const result = await updateGeneric<Event>({
        tableName: "event",
        data: {
          title: data.event.title,
          start: data.event.start || new Date(),
          end: data.event.end || new Date(),
          allDay: data.event.allDay,
        },
        whereCondition: {
          id: parseInt(data.event.id),
        },
      });

      if (!result?.error) {
        const newEvent = result?.data;
        if (newEvent) {
          setEvents([...events, newEvent]);
        }
      }
    });
  };

  const handleEventRemove = (data: EventRemoveArg) => {
    startTransition(async () => {
      const result = await deleteGeneric<Event>({
        tableName: "event",
        whereCondition: {
          id: parseInt(data.event.id),
        },
      });

      if (!result?.error) {
        console.log(result);
      }
    });
  };

  const EventControlItems = ({
    eventInfo,
    showLabels = false,
  }: {
    eventInfo: EventContentArg;
    showLabels?: boolean;
  }) => {
    const createControlItem = (icon: React.ReactNode, label: string, onClick: (e: React.MouseEvent) => void) => (
      <div
        className={cn(
          showLabels &&
            "flex items-center gap-2 cursor-pointer text-facebook dark:text-gray-300 hover:bg-muted dark:hover:bg-gray-800 transition-all py-2 px-1 rounded-md"
        )}
        onClick={onClick}
      >
        {icon}
        {showLabels && <span>{label}</span>}
      </div>
    );

    const editItem = createControlItem(<FiEdit className="cursor-pointer" />, "Edit", (e) => {
      e.stopPropagation();
      setShowForm(true);
      setSelectedEventId(eventInfo.event.id);
      setTimeout(() => {
        if (title.current) title.current.value = eventInfo.event.title;
      });
    });

    const deleteItem = createControlItem(<FiX className="cursor-pointer" />, "Delete", (e) => {
      e.stopPropagation();
      showGenericConfirm({
        title: "Delete Event",
        message: `Are you sure you want to delete the event: ${eventInfo.event.title}? This action cannot be undone.`,
        primaryActionLabel: "Delete",
        primaryAction: () => {
          eventInfo.event.remove();
          toast.success("Event deleted successfully.");
        },
      });
    });

    const Content = (
      <>
        {editItem}
        {deleteItem}
      </>
    );

    return showLabels ? <div className="flex flex-col gap-1 w-full">{Content}</div> : Content;
  };
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between text-[16px] bg-facebook w-full rounded-md text-white dark:bg-gray-700 transition-all hover:bg-facebook-600 dark:hover:bg-gray-500 p-1">
            <i>{eventInfo.event.title}</i>
            <div className="ml-auto items-center gap-1 hidden lg:flex">
              <EventControlItems eventInfo={eventInfo} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="lg:hidden dark:bg-gray-700">
          <div className="flex items-center gap-1 lg:hidden">
            <EventControlItems eventInfo={eventInfo} showLabels />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  const handleEventClick = (clickInfo: EventClickArg) => {};

  const handleEvents = (events: EventApi[]) => {};

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const showError = (message: string) => {
      toast.error(message);
    };

    const updateEvent = async () => {
      const result = await updateGeneric<Event>({
        tableName: "event",
        data: { title: title?.current!.value },
        whereCondition: { id: parseInt(selectedEventId!) },
      });

      if (!result?.error) {
        const updatedEvents = events.map((event) =>
          event.id === parseInt(selectedEventId!) ? { ...event, title: title.current!.value } : event
        );

        setEvents(updatedEvents);
        setShowForm(false);
        toast.success("Event updated successfully.");
        setSelectedEventId(null);
      }
    };

    if (selectedEventId) {
      if (!title.current?.value) {
        showError("Please enter a title for the event.");
        return;
      }

      startTransition(updateEvent);
    } else {
      if (!title.current?.value || !selectInfo) {
        showError("Please enter a title for the event.");
        return;
      }

      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      calendarApi.addEvent({
        id: uuidv4(),
        title: title.current.value,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      setShowForm(false);
    }

    setSelectedEventId(null);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        themeSystem="themeSystem"
        buttonText={{
          day: "Day",
          month: "Month",
          today: "Today",
          week: "Week",
        }}
        dayMaxEvents={true}
        events={events as EventSourceInput}
        weekends={weekendsVisible}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        eventAdd={handleEventAdd}
        eventChange={handleEventChange}
        eventRemove={handleEventRemove}
        contentHeight={800}
      />
      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setSelectedEventId(null);
            if (title.current) title.current.value = "";
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-facebook dark:text-gray-200">
              {selectedEventId ? "Edit Event" : "Add Event"}
            </DialogTitle>
            <DialogDescription>
              {selectedEventId
                ? "Edit the event title below and click the update button."
                : "Enter the event title below and click the add button."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-[3px]">
              <Label>Title</Label>
              <Input ref={title} placeholder="Event Title" min={1} max={52} />
              <div className="flex items-center gap-1 self-end mt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedEventId(null);
                    if (title.current) title.current.value = "";
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-facebook hover:bg-facebook-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  {selectedEventId ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EventCalendar;
