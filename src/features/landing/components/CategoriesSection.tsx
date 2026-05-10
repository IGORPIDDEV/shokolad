import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { categories } from "@/data/categories"

import { Container } from "@/components/shared/Container"

export function CategoriesSection() {
  return (
    <section className="bg-background py-10 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              Оберіть смак
            </p>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">
              Категорії для кожного настрою
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden items-center rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-muted sm:inline-flex"
          >
            Усе меню
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group overflow-hidden rounded-[2rem] border border-border bg-card/80 p-2.5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_70px_rgba(58,36,28,0.12)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur">
                  {category.badge}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-[-0.045em] text-foreground sm:text-3xl">
                      {category.title}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    {category.items}
                  </span>

                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    {category.price}
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center text-sm font-bold text-foreground">
                  Переглянути
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm sm:hidden"
        >
          Усе меню
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Container>
    </section>
  )
}