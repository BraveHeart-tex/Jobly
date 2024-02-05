"use client";
import {
  DateSelectArg,
  EventAddArg,
  EventChangeArg,
  EventContentArg,
  EventRemoveArg,
  EventSourceInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FormEvent, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGenericConfirm } from "@/app/contexts/GenericConfirmContext";
import { FiEdit, FiX } from "react-icons/fi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createGenericWithCurrentUser, deleteGeneric, updateGeneric } from "@/lib/generic";
import { Event } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import EventCalendarForm from "./EventCalendarForm";

const EventCalendar = ({ userEvents }: { userEvents: Event[] }) => {
  let [isPending, startTransition] = useTransition();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(userEvents);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { showGenericConfirm } = useGenericConfirm();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setShowForm(true);
    setSelectInfo(selectInfo);
  };

  const handleEventAdd = (data: EventAddArg) => {
    startTransition(async () => {
      await createGenericWithCurrentUser<Event>({
        tableName: "event",
        data: {
          title: data.event.title,
          start: data.event.start || new Date(),
          end: data.event.end || new Date(),
          allDay: data.event.allDay,
        },
      });
    });
  };

  const handleEventChange = (data: EventChangeArg) => {
    startTransition(async () => {
      await updateGeneric<Event>({
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
    });
  };

  const handleEventRemove = (data: EventRemoveArg) => {
    startTransition(async () => {
      await deleteGeneric<Event>({
        tableName: "event",
        whereCondition: {
          id: parseInt(data.event.id),
        },
      });

      toast.success("Event deleted successfully.");
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
            "text-facebook hover:bg-muted flex cursor-pointer items-center gap-2 h-full rounded-md px-1 py-2 transition-all dark:text-gray-300 dark:hover:bg-gray-800"
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
    });

    const deleteItem = createControlItem(<FiX className="cursor-pointer" />, "Delete", (e) => {
      e.stopPropagation();
      showGenericConfirm({
        title: "Delete Event",
        message: `Are you sure you want to delete the event: ${eventInfo.event.title}? This action cannot be undone.`,
        primaryActionLabel: "Delete",
        primaryAction: () => {
          eventInfo.event.remove();
        },
      });
    });

    const Content = (
      <>
        {editItem}
        {deleteItem}
      </>
    );

    return showLabels ? <div className="flex w-full flex-col gap-1">{Content}</div> : Content;
  };
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-facebook hover:bg-facebook-600 h-full flex w-full items-center justify-between truncate rounded-md p-1 text-[16px] text-white transition-all dark:bg-gray-700 dark:hover:bg-gray-500">
            <i>{eventInfo.event.title}</i>
            <div className="ml-auto hidden items-center gap-1 lg:flex">
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

  const handleFormSubmit = (e: FormEvent, title: string) => {
    e.preventDefault();

    const showError = (message: string) => {
      toast.error(message);
    };

    const updateEvent = async () => {
      const result = await updateGeneric<Event>({
        tableName: "event",
        data: { title },
        whereCondition: { id: parseInt(selectedEventId!) },
      });

      if (!result?.error) {
        toast.success("Event updated successfully.");
        setShowForm(false);
        setTimeout(() => {
          setSelectedEventId(null);
        });

        const updatedEvents = events.map((event) =>
          event.id === parseInt(selectedEventId!) ? { ...event, title } : event
        );

        setEvents(updatedEvents);
      } else {
        showError("An error occurred while updating the event. Please try again.");
        setSelectedEventId(null);
        setShowForm(false);
      }
    };

    if (selectedEventId) {
      if (!title) {
        showError("Please enter a title for the event.");
        return;
      }

      startTransition(updateEvent);
    } else {
      if (!title || !selectInfo) {
        showError("Please enter a title for the event.");
        return;
      }

      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      calendarApi.addEvent({
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      setShowForm(false);
      toast.success("Event added successfully.");
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
        eventAdd={handleEventAdd}
        eventChange={handleEventChange}
        eventRemove={handleEventRemove}
        contentHeight={800}
      />
      <Dialog
        open={showForm && selectedEventId !== null}
        onOpenChange={(open) => {
          setShowForm(open);

          if (!open) {
            setSelectedEventId(null);
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
          <EventCalendarForm
            handleFormSubmit={handleFormSubmit}
            onCancelClick={() => {
              setShowForm(false);
              setSelectedEventId(null);
            }}
            selectedEventId={selectedEventId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EventCalendar;
