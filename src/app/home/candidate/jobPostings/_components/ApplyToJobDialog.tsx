import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { APP_NAME } from "@/lib/constants";
import { XIcon } from "lucide-react";
import type { RouterOutputs } from "trpc-router-types";

type ApplyToJobDialogProps = {
	jobDetails: RouterOutputs["job"]["getJobById"];
};

const ApplyToJobDialog = ({ jobDetails }: ApplyToJobDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Apply Now</Button>
			</DialogTrigger>
			<DialogContent
				className="w-full lg:max-w-screen-md p-0"
				doNotRenderClosePrimitive
			>
				<DialogHeader>
					<DialogTitle className="w-full flex items-center justify-between border-b px-6 py-4">
						Applying to {jobDetails?.title} at{" "}
						{jobDetails?.company?.name}
						<DialogClose asChild>
							<Button
								size="icon"
								variant="ghost"
								className="rounded-full"
							>
								<XIcon />
							</Button>
						</DialogClose>
					</DialogTitle>
				</DialogHeader>
				<div className="px-6">
					<div className="w-full flex items-center gap-4">
						<Progress value={33} className="text-foreground" />
						<span className="text-muted-foreground">%33</span>
					</div>
					<div className="mt-4">
						<h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
							Contact Information
						</h3>
					</div>

					<span className="text-muted-foreground text-sm">
						Submitting this application does not change your{" "}
						{APP_NAME} profile.
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ApplyToJobDialog;
