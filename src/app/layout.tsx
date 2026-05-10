import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"

import { ThemeProvider } from "@/components/shared/ThemeProvider"

import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Шоколад",
  description: "Кавʼярня та десерти ручної роботи",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}