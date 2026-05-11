import type { Metadata } from "next"
import { Onest } from "next/font/google"

import { ThemeProvider } from "@/components/shared/ThemeProvider"

import "./globals.css"

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Шоколад",
  description: "Кавʼярня та десерти ручної роботи",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${onest.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
