import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, PenSquare, SparklesIcon } from "lucide-react";

const UserProfileAboutSection = () => {
  const exampleSkills = ["React.js", "Git", "Node.js", "Typescript", "SQL"];
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">About</h2>
            <Button size="icon" variant={"ghost"}>
              <PenSquare />
            </Button>
          </div>
          <p className="py-4 text-[0.93rem]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
            eligendi neque reprehenderit. Alias commodi earum nihil numquam odit
            rerum veniam!
          </p>

          <div className="rounded-md border p-3 flex items-center justify-between">
            <div className="flex gap-2">
              <SparklesIcon className="mt-[2px]" />
              <div>
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  Most Important Skills
                </h4>
                <p>{exampleSkills.join(" • ")}</p>
              </div>
            </div>
            <Button size={"icon"} variant={"ghost"}>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileAboutSection;
