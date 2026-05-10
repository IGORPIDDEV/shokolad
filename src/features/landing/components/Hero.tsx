import Image from "next/image"
import { ArrowRight, CakeSlice, Coffee, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"

const features = [
  {
    icon: Coffee,
    title: "Добірна кава",
    text: "Зерна преміум якості",
  },
  {
    icon: CakeSlice,
    title: "Власні десерти",
    text: "Готуємо щодня",
  },
  {
    icon: Heart,
    title: "З любовʼю",
    text: "До кожної деталі",
  },
]

export function Hero() {
  return (
    <section className="bg-background py-6 sm:py-10 lg:py-14">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card/70 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur lg:rounded-[3rem]">
          <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
            <div className="flex flex-col justify-center px-1 py-4 sm:px-4 lg:py-10">
              <div className="mb-5 inline-flex w-fit items-center rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                Кавʼярня & десерти
              </div>

              <h1 className="max-w-2xl text-[3.1rem] font-extrabold leading-[0.92] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
                Шоколад, кава та торти ручної роботи
              </h1>

              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Свіжа кава, ніжні десерти й торти на замовлення для особливих моментів.
              </p>

              <div className="mt-7 grid gap-3 sm:flex">
                <Button size="lg" className="w-full sm:w-auto">
                  Переглянути меню
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-background sm:w-auto"
                >
                  <CakeSlice className="mr-2 h-5 w-5" />
                  Торти на замовлення
                </Button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {features.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <div key={feature.title} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {feature.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative min-h-[240px] overflow-hidden rounded-[1.6rem] bg-muted sm:min-h-[340px] lg:min-h-[620px] lg:rounded-[2.5rem]">
              <Image
                src="/images/hero/hero.png"
                alt="Кава та шоколадний десерт"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}