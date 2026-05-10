import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Кавʼярня & десерти
            </p>

            <h1 className="max-w-2xl font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-8xl">
              Шоколад, кава та торти ручної роботи
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Свіжа кава, ніжні десерти й торти на замовлення для особливих моментів.
            </p>

            <div className="mt-7 grid gap-3 sm:flex">
              <Button size="lg" className="h-12 rounded-full px-8">
                Переглянути меню
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-card px-8"
              >
                Зібрати торт
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-[2rem] border border-border bg-card p-2 shadow-sm sm:p-3">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-muted lg:aspect-[4/5]">
                <span className="font-heading text-4xl text-muted-foreground sm:text-5xl">
                  Фото десерту
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
              <div className="rounded-3xl border border-border bg-card p-4">
                <p className="font-heading text-3xl text-foreground">85₴</p>
                <p className="text-xs text-muted-foreground">десерти від</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4">
                <p className="font-heading text-3xl text-foreground">10:00</p>
                <p className="text-xs text-muted-foreground">відкриваємось</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}