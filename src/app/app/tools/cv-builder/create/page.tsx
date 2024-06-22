import DocumentBuilderHeader from "../../_components/DocumentBuilderHeader";

const CreateCvPage = () => {
  return (
    <main className="grid grid-cols-2 fixed top-0 z-50 w-full">
      <div className="bg-card min-h-screen p-10">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
          <DocumentBuilderHeader />
        </div>
      </div>
      <div className="bg-muted-foreground min-h-screen flex items-center justify-center flex-col">
        Resume Live Preview
      </div>
    </main>
  );
};

export default CreateCvPage;
