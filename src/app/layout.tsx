import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"

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
    <html lang="uk">
      <body
        className={`${inter.variable} ${cormorant.variable} bg-[#FFF8F2] text-[#3A241C] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}