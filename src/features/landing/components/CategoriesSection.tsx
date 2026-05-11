import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Category } from "@/features/categories/services/get-categories"
import { Container } from "@/components/shared/Container"

type CategoriesSectionProps = {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="bg-background py-10 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="border-border bg-card text-muted-foreground mb-3 inline-flex rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              Оберіть смак
            </p>

            <h2 className="text-foreground max-w-2xl text-4xl leading-[0.95] font-extrabold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Категорії для кожного настрою
            </h2>
          </div>

          <Link
            href="/menu"
            className="border-border bg-card text-foreground hover:bg-muted hidden items-center rounded-full border px-5 py-3 text-sm font-bold shadow-sm transition sm:inline-flex"
          >
            Усе меню
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?category=${category.slug}`}
              className="group border-border bg-card/80 overflow-hidden rounded-[2rem] border p-2.5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_70px_rgba(58,36,28,0.12)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="bg-muted relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={category.image_url || "/images/categories/coffee.png"}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                <div className="bg-background/85 text-foreground absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur">
                  Fresh daily
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-foreground text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
                      {category.title}
                    </h3>

                    <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-6">
                      {category.description}
                    </p>
                  </div>

                  <span className="bg-primary text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm transition group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>

                <div className="text-foreground mt-5 inline-flex items-center text-sm font-bold">
                  Переглянути
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className="border-border bg-card text-foreground mt-5 inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-bold shadow-sm sm:hidden"
        >
          Усе меню
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Container>
    </section>
  )
}
