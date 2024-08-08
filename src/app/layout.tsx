import "@/styles/globals.css";
import "@/styles/quill.css";
import "@/styles/reactPdf.css";
import "@/styles/tiptap.css";
import ConfirmDialog from "@/components/ConfirmDialog";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME } from "@/lib/constants";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import type React from "react";

export const metadata = {
	title: APP_NAME,
	description: `${APP_NAME} is a modern job portal that is meant for both employers and candidates. Streamline your job/talent search with ${APP_NAME}.`,
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<Toaster richColors closeButton />
						<ConfirmDialog />
						<Navbar />
						{children}
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
