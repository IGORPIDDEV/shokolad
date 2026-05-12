import { Clock3, Coffee, MapPin, MessageCircle, Phone } from "lucide-react"

import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"
import { Container } from "@/components/shared/Container"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <section className="bg-background py-8 sm:py-12 lg:py-16">
          <Container>
            <div className="border-border bg-card/70 rounded-[2rem] border p-5 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur sm:p-8 lg:rounded-[3rem] lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="border-border bg-background text-muted-foreground mb-5 inline-flex rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
                    Контакти
                  </div>

                  <h1 className="text-foreground text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                    Завітайте
                    <br />
                    до нас
                  </h1>

                  <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 font-medium sm:text-lg">
                    Ми поруч, щоб приготувати свіжу каву, ніжні десерти й торти
                    для особливих моментів.
                  </p>

                  <div className="mt-8 grid gap-3 sm:flex">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Phone className="mr-2 h-5 w-5" />
                      Подзвонити
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-background w-full sm:w-auto"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Маршрут
                    </Button>
                  </div>
                </div>

                <div className="border-border bg-background rounded-[2rem] border p-4">
                  <div className="bg-muted rounded-[1.5rem] p-5">
                    <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full">
                      <Coffee className="h-6 w-6" />
                    </div>

                    <h2 className="text-foreground mt-6 text-3xl font-extrabold tracking-[-0.05em]">
                      Шоколад coffee & desserts
                    </h2>

                    <div className="mt-6 grid gap-3">
                      <InfoRow
                        icon={MapPin}
                        text="м. Черкаси, вул. Шоколадна, 12"
                      />
                      <InfoRow icon={Clock3} text="Щодня · 08:00 — 21:00" />
                      <InfoRow icon={Phone} text="+380 99 123 45 67" />
                      <InfoRow icon={MessageCircle} text="@shokolad.cafe" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border bg-card mt-6 overflow-hidden rounded-[2rem] border p-3">
              <div className="bg-muted flex min-h-[360px] items-center justify-center rounded-[1.5rem] text-center">
                <div>
                  <MapPin className="text-muted-foreground mx-auto h-8 w-8" />
                  <p className="text-foreground mt-4 text-2xl font-extrabold tracking-[-0.045em]">
                    Тут буде карта
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Google Maps або iframe з адресою кавʼярні
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <FloatingCart />
    </>
  )
}

function InfoRow({
  icon: Icon,
  text,
}: {
  icon: React.ElementType
  text: string
}) {
  return (
    <div className="bg-card/80 flex items-center gap-3 rounded-2xl p-3">
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="h-4 w-4" />
      </div>

      <p className="text-foreground text-sm font-bold">{text}</p>
    </div>
  )
}
