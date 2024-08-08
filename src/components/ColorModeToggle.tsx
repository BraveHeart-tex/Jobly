"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cog, Moon, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";

const COLOR_MODES: { label: string; value: string; icon: LucideIcon }[] = [
	{
		label: "Light",
		value: "light",
		icon: Sun,
	},
	{
		label: "Dark",
		value: "dark",
		icon: Moon,
	},
	{
		label: "System",
		value: "system",
		icon: Cog,
	},
];

const ColorModeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{COLOR_MODES.map((mode) => (
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={() => setTheme(mode.value)}
						key={mode.value}
					>
						<mode.icon className="h-[1.2rem] w-[1.2rem] mr-2" />
						{mode.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ColorModeToggle;
