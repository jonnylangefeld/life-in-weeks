import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Life in Weeks",
  description: "Create a chart of your life in weeks.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="m-2 flex min-h-screen min-w-[280px] items-start justify-center sm:m-4 md:m-6">
            <div className="flex w-full max-w-screen-2xl flex-col overflow-hidden rounded-lg bg-muted p-2 shadow-lg sm:p-4 md:p-6">
              <Suspense>{children}</Suspense>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
