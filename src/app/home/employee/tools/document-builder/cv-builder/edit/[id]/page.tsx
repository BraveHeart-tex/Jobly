import DocumentBuilderPanel from "@/app/home/employee/tools/_components/DocumentBuilderPanel";
import DocumentBuilderPreview from "@/app/home/employee/tools/_components/DocumentBuilderPreview";
import DocumentInitializer from "@/app/home/employee/tools/_components/DocumentInitializer";
import { buttonVariants } from "@/components/ui/button";
import { isErrorObject } from "@/lib/guards";
import { EMPLOYEE_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientOnly from "@/app/home/employee/tools/_components/ClientOnly";

const EditCvPage = async ({ params }: { params: { id: string } }) => {
  const documentResponse = await api.document.getDocumentDetails({
    id: Number.parseInt(params.id),
    allowedRoles: ["employee"],
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
            className="mx-auto dark:invert"
          />
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
            Oops! There was a problem loading this document
          </h1>
          <p className="text-xl text-muted-foreground">
            {documentResponse.error}
          </p>
          <Link
            href={EMPLOYEE_ROUTES.DOCUMENT_BUILDER}
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
    <main>
      <DocumentBuilderPanel />
      <DocumentInitializer documentData={documentResponse} />
      <ClientOnly>
        <DocumentBuilderPreview />
      </ClientOnly>
    </main>
  );
};

export default EditCvPage;
