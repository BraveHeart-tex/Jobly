import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyListCallToActionProps {
  title: string;
  description: string;
  illustrationPath: string;
  darkIllustrationPath?: string;
}

const EmptyListCallToAction = ({
  title,
  description,
  illustrationPath,
  darkIllustrationPath,
}: EmptyListCallToActionProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <Image
        alt={title}
        src={illustrationPath}
        width={320}
        height={320}
        className={cn(
          "size-[250px]",
          darkIllustrationPath && "dark:hidden",
          !darkIllustrationPath && "dark:invert",
        )}
      />
      {darkIllustrationPath && (
        <Image
          alt={title}
          src={darkIllustrationPath}
          width={320}
          height={320}
          className={"size-[250px] hidden dark:block"}
        />
      )}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};
export default EmptyListCallToAction;
