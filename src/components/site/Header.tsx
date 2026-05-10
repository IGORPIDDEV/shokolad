"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"
import { ThemeToggle } from "@/components/site/ThemeToggle"
import { MobileMenu } from "@/components/site/MobileMenu"

const navItems = [
  { href: "/menu", label: "Меню" },
  { href: "/cakes", label: "Торти" },
  { href: "/constructor", label: "Конструктор" },
  { href: "/delivery", label: "Доставка" },
  { href: "/contacts", label: "Контакти" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            Ш
          </span>

          <span className="font-heading text-3xl tracking-wide text-foreground sm:text-4xl">
            Шоколад
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-border bg-card/70 px-2 py-1 shadow-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Button className="hidden rounded-full px-5 lg:inline-flex">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Кошик
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Кошик"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>

          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}