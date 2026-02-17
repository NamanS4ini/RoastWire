import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/themeButton";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Void",
  description: "A modern, open-source, self-hosted chat application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(openSans.variable, "bg-white dark:bg-[#2b2d31]")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

                  <div className='z-9999999'>
                  <ModeToggle />
                  </div>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
