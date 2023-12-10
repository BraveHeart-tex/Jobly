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
      <h2 className="text-2xl lg:text-3xl text-facebook dark:text-foreground font-semibold">Planner</h2>
      <span className="text-gray-500 dark:text-gray-400">Use the calendar below to add events to your planner.</span>
      <div className="mt-4">{!events?.error && <EventCalendar userEvents={events?.data || []} />}</div>
    </AnimationRoot>
  );
};
export default PlannerPage;
