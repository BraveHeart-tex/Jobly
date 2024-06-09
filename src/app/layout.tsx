import "@/styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import type React from "react";

export const metadata = {
  title: "Jobly",
  description:
    "Jobly is a modern job portal that is meant for both employers and employees. Streamline your job/talent search with Jobly.",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors closeButton />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
