import PageContainer from "@/components/PageContainer";

const JobTrackerPage = () => {
  return (
    <main>
      <PageContainer>
        <div className="grid gap-1">
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
            Job Tracker Board
          </h1>
          <p className="text-muted-foreground">
            Track and organize your job applications and interviews.
          </p>
        </div>
      </PageContainer>
    </main>
  );
};

export default JobTrackerPage;
