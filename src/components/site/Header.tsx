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
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between border-b border-border/70">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-sm">
              Ш
            </span>

            <span className="text-3xl font-extrabold tracking-[-0.06em] text-foreground">
              Шоколад
            </span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-bold text-foreground lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              variant="outline"
              size="icon-sm"
              className="bg-card/80 shadow-sm backdrop-blur"
              aria-label="Кошик"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}