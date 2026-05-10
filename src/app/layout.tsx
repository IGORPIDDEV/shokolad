import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"

import { ThemeProvider } from "@/components/shared/ThemeProvider"

import "./globals.css"

import { Manrope, Marcellus } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
})

const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
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
      <body className={`${manrope.variable} ${marcellus.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}