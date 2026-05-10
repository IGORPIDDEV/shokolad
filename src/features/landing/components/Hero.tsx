import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Кавʼярня & десерти
            </p>

            <h1 className="max-w-2xl font-heading text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              Шоколад, кава та торти ручної роботи
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Свіжа кава, ніжні десерти й торти на замовлення для особливих моментів.
              Замовляйте онлайн або забирайте з кавʼярні.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Переглянути меню
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-card px-8"
              >
                Зібрати торт
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-border bg-card p-3 shadow-sm">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-muted">
                <span className="font-heading text-4xl text-muted-foreground">
                  Фото десерту
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-border bg-card p-5 shadow-sm sm:block">
              <p className="font-heading text-3xl text-foreground">від 85₴</p>
              <p className="text-sm text-muted-foreground">десерти щодня</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}