import "@/styles/globals.css";
import "@/styles/reactPdf.css";
import "@/styles/tiptap.css";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Navbar from "@/components/common/Navbar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME } from "@/lib/constants";
import { TRPCReactProvider } from "@/trpc/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "@/app/api/uploadthing/core";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: APP_NAME,
  description: `${APP_NAME} is a modern job portal that is meant for both employers and candidates. Streamline your job/talent search with ${APP_NAME}.`,
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors closeButton />
            <ConfirmDialog />
            <Navbar />
            <NextTopLoader
              showSpinner={false}
              color="hsl(var(--primary))"
              shadow="0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--primary))"
            />
            <div className="pt-[3.375rem]">{children}</div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
