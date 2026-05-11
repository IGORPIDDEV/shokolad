"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  CakeSlice,
  Coffee,
  Heart,
  Menu,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"

const navItems = [
  { href: "/menu", label: "Меню", description: "Кава, десерти та напої" },
  { href: "/cakes", label: "Торти", description: "Готові та на замовлення" },
  { href: "/delivery", label: "Доставка", description: "Умови та самовивіз" },
  { href: "/about", label: "Про нас", description: "Наша історія" },
  { href: "/contacts", label: "Контакти", description: "Адреса та графік" },
]

const features = [
  { icon: Coffee, label: "Кава" },
  { icon: CakeSlice, label: "Десерти" },
  { icon: Truck, label: "Доставка" },
]

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="bg-card/80 shadow-sm backdrop-blur lg:hidden"
          aria-label="Відкрити меню"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[92vw] max-w-sm flex-col overflow-hidden border-border bg-background p-0 [&>button]:hidden"
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground shadow-sm">
                Ш
              </span>

              <span className="text-2xl font-extrabold tracking-[-0.055em] text-foreground">
                Шоколад
              </span>
            </SheetTitle>

            <SheetDescription className="sr-only">
              Мобільне меню навігації сайту
            </SheetDescription>

            <SheetClose asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:bg-muted"
                aria-label="Закрити меню"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="rounded-[1.75rem] border border-border bg-card/80 p-4 shadow-[0_14px_45px_rgba(58,36,28,0.07)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Кавʼярня & десерти
            </p>

            <p className="mt-3 max-w-xs text-3xl font-extrabold leading-[0.95] tracking-[-0.055em] text-foreground">
              Солодкі моменти щодня
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.label}
                    className="rounded-lg bg-muted px-2 py-3 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-foreground" />
                    <p className="mt-2 text-[10px] font-bold leading-tight text-muted-foreground">
                      {feature.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <nav className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between rounded-[1.35rem] border border-border bg-card/80 px-4 py-3.5 shadow-sm transition hover:bg-muted"
                >
                  <span>
                    <span className="block text-lg font-extrabold tracking-[-0.035em] text-foreground">
                      {item.label}
                    </span>

                    <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
                      {item.description}
                    </span>
                  </span>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>

        <div className="border-t border-border bg-background/90 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] backdrop-blur">
          <Button className="w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Перейти в кошик
          </Button>

          <p className="mt-3 text-center text-xs font-medium text-muted-foreground">
            Працюємо щодня · 10:00–21:00
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}