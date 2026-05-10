"use client"

import Link from "next/link"
import { ArrowUpRight, Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { href: "/menu", label: "Меню", description: "Кава, десерти та напої" },
  { href: "/cakes", label: "Торти", description: "Готові та на замовлення" },
  { href: "/constructor", label: "Конструктор", description: "Збери свій торт" },
  { href: "/delivery", label: "Доставка", description: "Умови та самовивіз" },
  { href: "/contacts", label: "Контакти", description: "Адреса та години роботи" },
]

export function MobileMenu() {
  return (
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

      <SheetContent
        side="right"
        className="w-[92vw] max-w-sm border-border bg-background p-0"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-border px-5 py-5 text-left">
            <SheetTitle className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                Ш
              </span>

              <span className="font-heading text-3xl font-normal tracking-wide text-foreground">
                Шоколад
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="px-5 py-5">
            <div className="rounded-[2rem] border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Кавʼярня & десерти
              </p>

              <p className="mt-3 font-heading text-4xl leading-none text-foreground">
                Солодкі моменти щодня
              </p>
            </div>

            <nav className="mt-5 grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-3xl border border-border bg-card px-4 py-4 transition hover:bg-muted"
                >
                  <span>
                    <span className="block text-base font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </span>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto border-t border-border p-5">
            <Button className="h-12 w-full rounded-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Перейти в кошик
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Працюємо щодня · 10:00–21:00
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}