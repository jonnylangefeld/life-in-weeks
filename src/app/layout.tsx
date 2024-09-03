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
  console.log("layout")
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-svh justify-center sm:p-2 md:p-4 lg:p-6">
            <div className="max-h-full w-full max-w-screen-2xl overflow-x-auto overflow-y-clip bg-muted p-3 sm:rounded-md sm:p-2 md:p-4 lg:rounded-lg">
              <Suspense>{children}</Suspense>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
