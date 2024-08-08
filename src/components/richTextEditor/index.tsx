"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	ChevronDownIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Heading4Icon,
	Heading5Icon,
	Heading6Icon,
	HeadingIcon,
	Italic,
	LinkIcon,
	List,
	ListOrdered,
	Redo,
	Undo,
	UnlinkIcon,
} from "lucide-react";
import { useCallback, useRef } from "react";

const HEADING_OPTIONS = [
	{
		icon: Heading1Icon,
		level: 1,
	},
	{
		icon: Heading2Icon,
		level: 2,
	},
	{
		icon: Heading3Icon,
		level: 3,
	},
	{
		icon: Heading4Icon,
		level: 4,
	},
	{
		icon: Heading5Icon,
		level: 5,
	},
	{
		icon: Heading6Icon,
		level: 6,
	},
] as const;

type MenuBarProps = {
	editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
	const linkRef = useRef<HTMLInputElement>(null);

	const setLink = useCallback(() => {
		if (!editor) return;
		const url = linkRef.current?.value;

		if (!url) {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		// update link
		editor
			.chain()
			.focus()
			.extendMarkRange("link")
			.setLink({ href: url })
			.run();
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<div className="flex items-center">
							<HeadingIcon className="size-4" />
							<ChevronDownIcon className="size-3" />
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{HEADING_OPTIONS.map((option) => (
						<DropdownMenuItem
							key={option.level}
							className={
								editor.isActive("heading", {
									level: option.level,
								})
									? "bg-secondary/90"
									: ""
							}
							onClick={() =>
								editor
									.chain()
									.focus()
									.toggleHeading({ level: option.level })
									.run()
							}
						>
							<option.icon />
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={
					editor.isActive("bold")
						? " bg-gray-200 dark:bg-gray-700"
						: ""
				}
			>
				<Bold className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={
					editor.isActive("italic")
						? " bg-gray-200 dark:bg-gray-700"
						: ""
				}
			>
				<Italic className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				disabled={
					!editor.can().chain().focus().toggleBulletList().run()
				}
				className={
					editor.isActive("bulletList")
						? " bg-gray-200 dark:bg-gray-700"
						: ""
				}
			>
				<List className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				disabled={
					!editor.can().chain().focus().toggleOrderedList().run()
				}
				className={
					editor.isActive("orderedList")
						? " bg-gray-200 dark:bg-gray-700"
						: ""
				}
			>
				<ListOrdered className="h-4 w-4" />
			</Button>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={
							editor.isActive("orderedList")
								? " bg-gray-200 dark:bg-gray-700"
								: ""
						}
						onClick={() => {
							const previousUrl =
								editor.getAttributes("link").href;
							// we need a timeout because the trigger will open the popover that contains the input
							setTimeout(() => {
								if (!linkRef.current || !previousUrl) return;
								linkRef.current.value = previousUrl;
							});
						}}
					>
						<LinkIcon className="h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="grid gap-2">
					<div className="flex flex-col gap-1">
						<Label>Link</Label>
						<Input
							ref={linkRef}
							type="text"
							onKeyDown={(e) => {
								const key = e.key;
								if (key === "Enter") {
									e.preventDefault();
									setLink();
								}
							}}
						/>
					</div>
					<Button
						onClick={() => {
							setLink();
						}}
					>
						Save
					</Button>
				</PopoverContent>
			</Popover>
			{editor.isActive("link") ? (
				<Button
					variant="outline"
					size="icon"
					onClick={() => editor?.chain().focus().unsetLink().run()}
				>
					<UnlinkIcon className="h-4 w-4" />
				</Button>
			) : null}
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<Undo className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<Redo className="h-4 w-4" />
			</Button>
		</div>
	);
};

const RichTextEditor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
		],
		content: "<p>Hello World! 🌎</p>",
	});

	return (
		<Card className="w-full max-w-3xl mx-auto border border-gray-300 shadow-md">
			<CardContent className="p-6">
				<MenuBar editor={editor} />
				<EditorContent
					editor={editor}
					className="prose max-w-none focus:outline-none min-h-[200px]"
				/>
			</CardContent>
		</Card>
	);
};

export default RichTextEditor;
