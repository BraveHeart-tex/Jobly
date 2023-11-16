import AnimationRoot from "@/app/animations/AnimationRoot";

const PlannerPage = () => {
  return (
    <AnimationRoot>
      <h2 className="text-2xl lg:text-3xl text-facebook dark:text-foreground font-semibold">Planner</h2>
      <span className="text-gray-500 dark:text-gray-400">Use the calendar below to add events to your planner.</span>
    </AnimationRoot>
  );
};
export default PlannerPage;
