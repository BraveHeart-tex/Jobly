import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import GenericConfirmDialog from "@/components/GenericConfirmDialog";
import { GenericConfirmContextProvider } from "./contexts/GenericConfirmContext";
import SonnerToaster from "@/components/SonnerToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobly | Land your dream job",
  description:
    "Jobly is a job tracking app that helps you land your dream job. It offers a simple and intuitive interface to help you keep track of your job applications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme={"corporate"}>
        <body className={inter.className}>
          <GenericConfirmContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SonnerToaster />
              <GenericConfirmDialog />
              {children}
            </ThemeProvider>
          </GenericConfirmContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
