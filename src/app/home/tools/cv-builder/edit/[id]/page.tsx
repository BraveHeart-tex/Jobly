import DocumentBuilderPanel from "@/app/home/tools/_components/DocumentBuilderPanel";
import DocumentBuilderPreview from "@/app/home/tools/_components/DocumentBuilderPreview";
import DocumentInitializer from "@/app/home/tools/_components/DocumentInitializer";
import DocumentLoader from "@/app/home/tools/_components/DocumentLoader";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { isErrorObject } from "@/lib/guards";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EditCvPage = async ({ params }: { params: { id: string } }) => {
  const documentResponse = await api.document.getDocumentDetails({
    id: Number.parseInt(params.id),
  });

  if (isErrorObject(documentResponse)) {
    return (
      <main className="flex items-center justify-center fixed top-0 z-50 w-full h-full">
        <div className="grid gap-4 text-center">
          <Image
            src={"/document-not-found.svg"}
            alt={documentResponse.error}
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
            Oops! There was a problem loading this document
          </h1>
          <p className="text-xl text-muted-foreground">
            {documentResponse.error}
          </p>
          <Link
            href={ROUTES.CV_BUILDER}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "flex items-center gap-2 w-full lg:w-max mx-auto",
            )}
          >
            <ArrowLeft />
            Back to Documents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-2 fixed top-0 z-50 w-full">
      <DocumentBuilderPanel />
      <DocumentLoader />
      <DocumentInitializer documentData={documentResponse} />
      <DocumentBuilderPreview />
    </main>
  );
};

export default EditCvPage;
