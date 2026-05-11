import { Header } from "@/components/site/Header"
import { Container } from "@/components/shared/Container"

export default function Loading() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <section className="bg-background py-8 sm:py-12 lg:py-16">
          <Container>
            <div className="border-border bg-card/80 rounded-[2rem] border p-5 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur sm:p-8 lg:rounded-[3rem]">
              <div className="bg-muted h-[34px] w-[86px] animate-pulse rounded-full" />

              <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
                <div>
                  <div className="bg-muted h-[92px] w-full max-w-3xl animate-pulse rounded-[2rem] sm:h-[110px] lg:h-[132px]" />

                  <div className="bg-muted mt-5 h-14 w-full max-w-xl animate-pulse rounded-2xl sm:h-16" />
                </div>

                <div className="bg-muted h-14 animate-pulse rounded-2xl" />
              </div>
            </div>

            <div className="border-border bg-background/85 lg:bg-card/70 sticky top-20 z-30 -mx-4 mt-6 border-y px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:rounded-full lg:border lg:px-3">
              <div className="flex gap-2 overflow-hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-muted h-[36px] w-[76px] shrink-0 animate-pulse rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="border-border bg-card/80 overflow-hidden rounded-[2rem] border p-2.5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur">
      <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
        <div className="bg-background/60 absolute top-4 left-4 h-[26px] w-[58px] animate-pulse rounded-full" />
        <div className="bg-background/60 absolute top-4 right-4 h-10 w-10 animate-pulse rounded-full" />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="bg-muted h-[32px] w-4/5 animate-pulse rounded-2xl" />

            <div className="bg-muted mt-3 h-4 w-full animate-pulse rounded-full" />
            <div className="bg-muted mt-2 h-4 w-3/4 animate-pulse rounded-full" />
          </div>

          <div className="bg-muted h-[24px] w-[58px] shrink-0 animate-pulse rounded-full" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="bg-muted h-[32px] w-[70px] animate-pulse rounded-2xl" />

          <div className="bg-muted h-11 w-[104px] animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  )
}
