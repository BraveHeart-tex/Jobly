"use client";
import { DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const EventCalendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [events, setEvents] = useState([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // calendarApi.addEvent({
      //   id: uuidv4()
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay,
      // });
    }
  };

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  };

  const handleEvents = (events: EventApi[]) => {
    console.log(events);
    // map them into a new format
  };

  return (
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
      initialEvents={events}
      weekends={weekendsVisible}
      select={handleDateSelect}
      eventContent={renderEventContent} // custom render function
      eventClick={handleEventClick}
      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
  eventAdd={function(){}}
  eventChange={function(){}}
  eventRemove={function(){}}
  */
    />
  );
};
export default EventCalendar;
