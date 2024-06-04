import AnimationRoot from "@/src/components/animations/AnimationRoot";
import EventCalendar from "@/src/components/EventCalendar";
import { getGenericListByCurrentUser } from "@/src/lib/generic";
import { Event } from "@prisma/client";

const PlannerPage = async () => {
  const events = await getGenericListByCurrentUser<Event>({
    tableName: "event",
  });

  const plannerPageDescription = {
    destktop: " Click on a date to add an event. Click on an event to edit or delete it.",
    mobile:
      " Long press a date to add an event. Tap and hold the event to resize or move it. Click on an event for more actions.",
  };

  return (
    <AnimationRoot>
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
        Planner
      </h2>
      <div className="text-muted-foreground text-lg">
        <span>Use the calendar below to add events to your planner.</span>
        <span className="hidden lg:inline">{plannerPageDescription.destktop}</span>
        <span className="inline lg:hidden">{plannerPageDescription.mobile}</span>
      </div>
      <div className="mt-4">{!events?.error && <EventCalendar userEvents={events?.data || []} />}</div>
    </AnimationRoot>
  );
};
export default PlannerPage;
