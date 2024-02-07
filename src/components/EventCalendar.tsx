"use client";
import { DateSelectArg, EventChangeArg, EventContentArg, EventRemoveArg, EventSourceInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FormEvent, useState, useTransition } from "react";
import { useGenericConfirm } from "@/app/contexts/GenericConfirmContext";
import { FiEdit, FiTrash } from "react-icons/fi";
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

  // when user clicks on a date, Show selected date in form
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setShowForm(true);
    setSelectInfo(selectInfo);
  };

  // update event on db
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

  // delete event from db
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

  // Render event control items
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
            "text-facebook font-semibold hover:bg-muted flex cursor-pointer items-center gap-2 h-full rounded-md px-1 py-2 transition-all dark:text-gray-300 dark:hover:bg-gray-800"
        )}
        onClick={onClick}
      >
        {icon}
        {showLabels && <span>{label}</span>}
      </div>
    );

    // Edit Popover Item
    const editItem = createControlItem(<FiEdit className="cursor-pointer" />, "Edit", (e) => {
      e.stopPropagation();
      setShowForm(true);
      setSelectedEventId(eventInfo.event.id);
    });

    // Delete Popover Item
    const deleteItem = createControlItem(<FiTrash className="cursor-pointer" />, "Delete", (e) => {
      e.stopPropagation();
      showGenericConfirm({
        title: "Delete Event",
        message: `Are you sure you want to delete the event: ${eventInfo.event.title}? This action cannot be undone.`,
        primaryActionLabel: "Delete",
        primaryAction: () => {
          eventInfo.event.remove();
          setEvents(events.filter((event) => event.id !== parseInt(eventInfo.event.id)));
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

  // Render Popover for edit and delete
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-facebook hover:bg-facebook-600 h-full flex w-full items-center justify-between truncate rounded-md p-1 text-[16px] text-white transition-all dark:bg-gray-700 dark:hover:bg-gray-500">
            <i>{eventInfo.event.title}</i>
          </div>
        </PopoverTrigger>
        <PopoverContent className="dark:bg-gray-700">
          <div className="flex items-center gap-1">
            <EventControlItems eventInfo={eventInfo} showLabels />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  const showError = (message: string) => {
    toast.error(message);
  };

  // Update event on db and calendar
  const updateEvent = async (title: string) => {
    const result = await updateGeneric<Event>({
      tableName: "event",
      data: { title },
      whereCondition: { id: parseInt(selectedEventId!) },
    });

    if (!result?.error) {
      toast.success("Event updated successfully.");

      const updatedEvents = events.map((event) =>
        event.id === parseInt(selectedEventId!) ? { ...event, title } : event
      );

      setEvents(updatedEvents);
      setSelectedEventId(null);
    } else {
      showError("An error occurred while updating the event. Please try again later.");
      setSelectedEventId(null);
      setShowForm(false);
    }
  };

  // Handle form submit for adding and updating event
  const handleFormSubmit = (e: FormEvent, title: string) => {
    e.preventDefault();

    // Update event
    if (selectedEventId) {
      if (!title) {
        showError("Please enter a title for the event.");
        return;
      }

      setShowForm(false);
      startTransition(() => updateEvent(title));
    } else {
      if (!title || !selectInfo) {
        showError("Please enter a title for the event.");
        return;
      }

      const calendarApi = selectInfo.view.calendar;

      // Add event to db and calendar
      startTransition(async () => {
        const response = await createGenericWithCurrentUser<Event>({
          tableName: "event",
          data: {
            title,
            start: new Date(selectInfo.startStr),
            end: new Date(selectInfo.endStr),
            allDay: selectInfo.allDay,
          },
        });

        if (response?.error) {
          setShowForm(false);
          return showError("An error occurred while adding the event. Please try again later.");
        }

        if (response?.data) {
          // Add event to calendar
          calendarApi.addEvent({
            id: response.data.id.toString(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });

          // Update events state
          setEvents([...events, response.data]);

          setShowForm(false);
          toast.success("Event added successfully.");

          // Clear selected date
          calendarApi.unselect();
        }
      });
    }

    setSelectedEventId(null);
  };

  return (
    <>
      <pre className="max-h-[300px] overflow-auto">{JSON.stringify(events, null, 2)}</pre>
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
            loading={isPending}
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
