import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { categories } from "@/data/categories"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/shared/Container"

export function CategoriesSection() {
  return (
    <section className="bg-background py-10 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Оберіть смак
            </p>

            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Категорії
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden items-center text-sm font-semibold text-foreground transition hover:text-muted-foreground sm:inline-flex"
          >
            Усе меню
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group overflow-hidden rounded-[2rem] border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-2.5 sm:p-3">
                  <div className="flex aspect-[16/10] items-center justify-center rounded-[1.5rem] bg-muted md:aspect-[4/3]">
                    <span className="font-heading text-3xl text-muted-foreground sm:text-4xl">
                      {category.imageLabel}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="mb-1.5 flex items-center justify-between gap-4">
                      <h3 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                        {category.title}
                      </h3>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:translate-x-1 sm:h-10 sm:w-10">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground sm:hidden"
        >
          Усе меню
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Container>
    </section>
  )
}