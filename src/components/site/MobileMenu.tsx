"use client"

import Link from "next/link"
import { ArrowUpRight, CakeSlice, Coffee, Heart, Menu, ShoppingBag } from "lucide-react"

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
  { href: "/delivery", label: "Доставка", description: "Умови та самовивіз" },
  { href: "/about", label: "Про нас", description: "Наша історія та підхід" },
  { href: "/contacts", label: "Контакти", description: "Адреса та години роботи" },
]

const features = [
  { icon: Coffee, label: "Кава" },
  { icon: CakeSlice, label: "Десерти" },
  { icon: Heart, label: "З любовʼю" },
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

      <SheetContent side="right" className="w-[92vw] max-w-sm border-border bg-background p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-border px-5 py-5 text-left">
            <SheetTitle className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground">
                Ш
              </span>

              <span className="text-3xl font-extrabold tracking-[-0.06em] text-foreground">
                Шоколад
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="px-5 py-5">
            <div className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-[0_14px_40px_rgba(58,36,28,0.08)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Кавʼярня & десерти
              </p>

              <p className="mt-3 text-3xl font-extrabold leading-[0.95] tracking-[-0.055em] text-foreground">
                Солодкі моменти щодня
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {features.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <div
                      key={feature.label}
                      className="rounded-2xl bg-muted px-2 py-3 text-center"
                    >
                      <Icon className="mx-auto h-5 w-5 text-foreground" />
                      <p className="mt-2 text-[11px] font-bold text-muted-foreground">
                        {feature.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <nav className="mt-5 grid gap-2.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-3xl border border-border bg-card/80 px-4 py-4 shadow-sm transition hover:bg-muted"
                >
                  <span>
                    <span className="block text-lg font-bold text-foreground">
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
            <Button className="w-full">
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