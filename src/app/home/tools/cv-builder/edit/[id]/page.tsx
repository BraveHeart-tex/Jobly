import DocumentBuilderPanel from "@/app/home/tools/_components/DocumentBuilderPanel";
import DocumentBuilderPreview from "@/app/home/tools/_components/DocumentBuilderPreview";
import { api } from "@/trpc/server";

const EditCvPage = async ({ params }: { params: { id: string } }) => {
  const document = await api.document.getDocumentById({
    id: Number.parseInt(params.id),
  });

  return (
    <main className="grid grid-cols-2 fixed top-0 z-50 w-full">
      <DocumentBuilderPanel documentData={document} />
      <DocumentBuilderPreview />
    </main>
  );
};

export default EditCvPage;
