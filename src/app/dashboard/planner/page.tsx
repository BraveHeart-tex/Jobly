import AnimationRoot from "@/app/animations/AnimationRoot";
import EventCalendar from "@/components/EventCalendar";
import { getGenericListByCurrentUser } from "@/lib/generic";
import { Event } from "@prisma/client";

const PlannerPage = async () => {
  const events = await getGenericListByCurrentUser<Event>({
    tableName: "event",
  });

  return (
    <AnimationRoot>
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
        Planner
      </h2>
      <span className="text-muted-foreground text-lg">
        Use the calendar below to add events to your planner. Click on a date to add an event. Click on an event to edit
        or delete it.
      </span>
      <div className="mt-4">{!events?.error && <EventCalendar userEvents={events?.data || []} />}</div>
    </AnimationRoot>
  );
};
export default PlannerPage;
