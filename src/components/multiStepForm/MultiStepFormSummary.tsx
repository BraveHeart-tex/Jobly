interface MultiStepFormSummaryProps {
  summarizedSteps: { label: string; value?: string | null }[];
}

const MultiStepFormSummary = ({
  summarizedSteps,
}: MultiStepFormSummaryProps) => {
  return (
    <div>
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Summary
        </h2>
        <p className="text-muted-foreground">
          Please review your information before submitting.
        </p>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {summarizedSteps.map((step) => (
            <p key={step.label}>
              <span className="font-medium">{step.label}</span>:{" "}
              {step.value || "Not Provided"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiStepFormSummary;
