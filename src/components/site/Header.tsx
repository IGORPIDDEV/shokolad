import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Container } from "@/components/shared/Container"
import { ThemeToggle } from "@/components/site/ThemeToggle"

const navItems = [
  { href: "/menu", label: "Меню" },
  { href: "/cakes", label: "Торти" },
  { href: "/constructor", label: "Конструктор" },
  { href: "/delivery", label: "Доставка" },
  { href: "/contacts", label: "Контакти" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link
          href="/"
          className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Шоколад
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Кошик"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>

          <Button className="hidden rounded-full lg:inline-flex">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Кошик
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label="Відкрити меню"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-4xl">
                  Шоколад
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-border bg-card px-4 py-4 text-lg font-medium text-foreground transition hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Button className="mt-6 h-12 w-full rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Перейти в кошик
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}