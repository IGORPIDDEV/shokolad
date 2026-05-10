import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"

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
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Шоколад
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <Button className="rounded-full">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Кошик
        </Button>
      </Container>
    </header>
  )
}