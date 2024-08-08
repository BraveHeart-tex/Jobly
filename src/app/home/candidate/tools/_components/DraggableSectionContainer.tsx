"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type React from "react";

type DraggableSectionContainerProps = {
	sectionId: DocumentSection["id"];
	children?: React.ReactNode;
	className?: string;
};

const DraggableSectionContainer = ({
	sectionId,
	children,
	className,
}: DraggableSectionContainerProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
		isOver,
		isSorting,
	} = useSortable({ id: sectionId });

	const shouldShowDragButton = !isDragging && !isOver && !isSorting;

	return (
		<div
			ref={setNodeRef}
			style={{
				transition,
				transform: CSS.Translate.toString(transform),
			}}
			{...attributes}
			className={cn("grid gap-2 relative group/container", className)}
		>
			{children}
			{shouldShowDragButton ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								{...listeners}
								className="cursor-grab lg:pointer-events-none lg:group-hover/container:pointer-events-auto lg:opacity-0 lg:group-hover/container:opacity-100 absolute -left-7 lg:-left-8 top-1 z-10 w-8 h-8 text-muted-foreground transition-all"
							>
								<GripVertical />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Click and drag to move</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : null}
		</div>
	);
};

export default DraggableSectionContainer;
