"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"
import { ThemeToggle } from "@/components/site/ThemeToggle"
import { MobileMenu } from "@/components/site/MobileMenu"
import { CartSheet } from "@/features/cart/components/CartSheet"
import { useCartStore } from "@/store/cart-store"

const navItems = [
  { href: "/menu", label: "Меню" },
  { href: "/cakes", label: "Торти" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
]

export function Header() {
  const count = useCartStore((state) => state.getItemsCount())
  const total = useCartStore((state) => state.getTotal())
  return (
    <header className="bg-background/75 sticky top-0 z-50 backdrop-blur-xl">
      <Container>
        <div className="border-border/70 flex h-20 items-center justify-between border-b">
          <Link href="/" className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold shadow-sm">
              Ш
            </span>

            <span className="text-foreground text-3xl font-extrabold tracking-[-0.06em]">
              Шоколад
            </span>
          </Link>

          <nav className="text-foreground hidden items-center gap-10 text-sm font-bold lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-muted-foreground transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop */}
            <CartSheet>
              <Button
                className="relative hidden h-11 rounded-full px-5 lg:inline-flex"
                aria-label="Кошик"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Кошик
                {count > 0 && (
                  <span className="bg-primary-foreground/15 ml-2 rounded-full px-2 py-0.5 text-xs font-extrabold">
                    {count}
                  </span>
                )}
                {count > 0 && (
                  <span className="ml-2 text-sm font-bold opacity-80">
                    {total}₴
                  </span>
                )}
              </Button>
            </CartSheet>

            {/* Mobile */}
            <CartSheet>
              <Button
                variant="outline"
                size="icon-sm"
                className="bg-card/80 relative shadow-sm backdrop-blur lg:hidden"
                aria-label="Кошик"
              >
                <ShoppingBag className="h-5 w-5" />

                {count > 0 && (
                  <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-extrabold shadow-sm">
                    {count}
                  </span>
                )}
              </Button>
            </CartSheet>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
