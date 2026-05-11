import { Header } from "@/components/site/Header"
import { Container } from "@/components/shared/Container"

export default function Loading() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <section className="bg-background py-6 sm:py-10 lg:py-14">
          <Container>
            <div className="bg-muted mb-5 h-5 w-32 animate-pulse rounded-full" />

            <div className="border-border bg-card/80 overflow-hidden rounded-[2rem] border p-3 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur lg:rounded-[3rem] lg:p-5">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
                <div className="bg-muted aspect-[4/3] animate-pulse rounded-[1.6rem] lg:aspect-[4/5] lg:rounded-[2.5rem]" />

                <div className="px-2 py-4 sm:px-4 lg:py-8">
                  <div className="bg-muted h-9 w-28 animate-pulse rounded-full" />

                  <div className="bg-muted mt-5 h-16 w-full max-w-md animate-pulse rounded-3xl" />
                  <div className="bg-muted mt-3 h-16 w-4/5 animate-pulse rounded-3xl" />

                  <div className="bg-muted mt-6 h-5 w-full max-w-lg animate-pulse rounded-full" />
                  <div className="bg-muted mt-3 h-5 w-2/3 animate-pulse rounded-full" />

                  <div className="bg-muted mt-8 h-32 animate-pulse rounded-[1.75rem]" />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
