"use client";
import { useState } from "react";
import SelectInput from "@/components/common/SelectInput";
import { showSuccessToast } from "@/components/toastUtils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUploadedDocument } from "@/features/candidate/documents/hooks/useCreateUploadedDocument";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { mimeTypeToExtension, useUploadThing } from "@/lib/uploadthing";
import { generateReadableEnumLabel } from "@/lib/utils/string";
import { documents } from "@/server/db/schema";
import { useDropzone } from "@uploadthing/react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useRouter } from "nextjs-toploader/app";
import { useCallback } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import {
  type UploadDocumentFormData,
  uploadDocumentFormValidator,
} from "@/validation/user/document/uploadedDocuments/uploadDocumentFormValidator";

const UploadDocumentDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useExtendedForm<UploadDocumentFormData>(
    uploadDocumentFormValidator,
    {
      defaultValues: {
        title: "",
        type: "resume",
      },
    },
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("file", acceptedFiles[0] as File);
    },
    [form.setValue],
  );

  const { createUploadedDocument, isCreatingUploadedDocument } =
    useCreateUploadedDocument({
      onSuccess: () => {
        router.refresh();
        form.reset();
        setOpen(false);
        showSuccessToast("Document uploaded successfully.");
      },
    });

  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "userDocuments",
    {
      onClientUploadComplete: (response) => {
        const result = response[0];
        if (!result) return;
        const { success, url } = result.serverData;
        if (!success) return;

        createUploadedDocument({
          title: form.getValues("title"),
          type: form.getValues("type"),
          url,
        });
      },
    },
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  const onSubmit = (data: UploadDocumentFormData) => {
    startUpload([data.file]);
  };

  const uploadedFile = form.watch("file");

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isCreatingUploadedDocument) {
          return;
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">Upload</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {uploadedFile ? (
              <div className="flex items-center border rounded-md gap-2">
                <span className="uppercase bg-primary/70 h-full p-3 rounded-md rounded-r-none font-medium text-primary-foreground">
                  {mimeTypeToExtension[uploadedFile.type]}
                </span>
                <div className="flex items-center justify-between flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">{uploadedFile.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {DateTime.fromMillis(uploadedFile.lastModified).toFormat(
                        "dd.MM.yyyy",
                      )}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      form.setValue("file", null as unknown as File);
                    }}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...getRootProps()}
                        className="w-full rounded-md border border-dotted border-primary flex flex-col gap-2 justify-center items-center p-8 cursor-pointer"
                      >
                        <UploadCloudIcon />
                        <p>
                          Click here{" "}
                          <span className="hidden lg:inline">
                            or drag and drop file
                          </span>{" "}
                          to upload
                        </p>
                        <input {...getInputProps()} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Document Title{" "}
                    <span className="text-muted-foreground">
                      (Will be visible to the employer.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={documents.type.enumValues.map((enumValue) => ({
                        label: generateReadableEnumLabel(enumValue, "_"),
                        value: enumValue,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      ref={field.ref}
                      placeholder="Select document type"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isUploading || isCreatingUploadedDocument}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
