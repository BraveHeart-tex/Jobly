"use client";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import {
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import DocumentBuilderRichTextInput from "@/features/candidate/document-builder/components/DocumentBuilderRichTextInput";
import CharacterCountIndicator from "@/features/candidate/document-builder/components/CharacterCountIndicator";
import {
  useDocumentSectionByInternalTag,
  useSectionField,
} from "@/features/candidate/document-builder/selectors";

const CvBuilderProfessionalSummarySection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
  );
  const field = useSectionField(section?.id);

  if (!field) return;

  return (
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {
            SECTION_DESCRIPTIONS_BY_TAG[
              INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY
            ]
          }
        </p>
      </div>
      <DocumentBuilderRichTextInput
        field={field}
        renderLabel={false}
        placeholder="E.g. Seasoned software developer with over 8 years of experience and a proven track record of..."
      />
      <div className="w-full items-center justify-between hidden lg:flex">
        <p className="text-sm text-muted-foreground">
          Tip: Aim for 400-600 characters in your application to boost your
          chances of landing an interview.
        </p>
        <div className="text-sm text-muted-foreground text-right">
          <CharacterCountIndicator fieldId={field.id} />
        </div>
      </div>
    </div>
  );
};
export default CvBuilderProfessionalSummarySection;
