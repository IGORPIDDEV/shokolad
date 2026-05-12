import {
  CakeSlice,
  Clock3,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react"

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
            <div className="border-border bg-card/70 overflow-hidden rounded-[2rem] border shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur lg:rounded-[3rem]">
              <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
                <div className="flex flex-col justify-center">
                  <div className="border-border bg-background text-muted-foreground mb-5 inline-flex w-fit rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
                    Доставка
                  </div>

                  <h1 className="text-foreground text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                    Доставимо солодке прямо до вас
                  </h1>

                  <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 font-medium sm:text-lg">
                    Замовляйте каву, десерти та торти онлайн. Ми звʼяжемось для
                    підтвердження і підкажемо найзручніший спосіб отримання.
                  </p>

                  <div className="mt-8 grid gap-3 sm:flex">
                    <Button size="lg" className="w-full sm:w-auto">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Перейти до меню
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-background w-full sm:w-auto"
                    >
                      <Truck className="mr-2 h-5 w-5" />
                      Умови доставки
                    </Button>
                  </div>
                </div>

                <div className="border-border bg-muted relative min-h-[460px] overflow-hidden rounded-[1.75rem] border lg:min-h-[460px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(197,138,92,0.26),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(239,163,168,0.24),transparent_30%)]" />

                  <div className="relative z-10 flex min-h-[460px] flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full">
                        <PackageCheck className="h-6 w-6" />
                      </div>

                      <h2 className="text-foreground mt-6 text-4xl leading-[0.95] font-extrabold tracking-[-0.055em] sm:text-5xl">
                        Свіже.
                        <br />
                        Акуратно.
                        <br />
                        Вчасно.
                      </h2>
                    </div>

                    <div className="mt-8 grid gap-3">
                      <MiniInfo icon={Clock3} text="Підтверджуємо замовлення" />
                      <MiniInfo icon={CakeSlice} text="Готуємо та пакуємо" />
                      <MiniInfo
                        icon={Truck}
                        text="Передаємо курʼєру або чекаємо на самовивіз"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <DeliveryCard
                icon={Truck}
                title="Доставка"
                text="Доставляємо по місту після підтвердження замовлення. Час залежить від району та завантаження."
              />

              <DeliveryCard
                icon={ShoppingBag}
                title="Самовивіз"
                text="Можна забрати замовлення з кавʼярні у зручний час після підтвердження."
              />

              <DeliveryCard
                icon={CakeSlice}
                title="Торти на замовлення"
                text="Авторські торти краще замовляти заздалегідь, щоб ми встигли підготувати декор."
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="border-border bg-card/80 rounded-[2rem] border p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="text-foreground text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
                  Як це працює
                </h2>

                <div className="mt-6 grid gap-4">
                  <Step
                    number="01"
                    title="Оберіть позиції"
                    text="Додайте каву, десерти або торт у кошик."
                  />

                  <Step
                    number="02"
                    title="Оформіть замовлення"
                    text="Залиште імʼя, телефон і спосіб отримання."
                  />

                  <Step
                    number="03"
                    title="Ми підтвердимо"
                    text="Звʼяжемось із вами та уточнимо деталі."
                  />

                  <Step
                    number="04"
                    title="Отримайте замовлення"
                    text="Заберіть у кавʼярні або очікуйте доставку."
                  />
                </div>
              </div>

              <div className="border-border bg-card/80 rounded-[2rem] border p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="text-foreground text-3xl font-extrabold tracking-[-0.05em]">
                  Важливо
                </h2>

                <div className="text-muted-foreground mt-6 space-y-4 text-sm leading-7 font-medium">
                  <p>
                    Великі замовлення та торти бажано оформлювати мінімум за 24
                    години.
                  </p>

                  <p>
                    Десерти пакуємо акуратно, щоб вони доїхали у найкращому
                    вигляді.
                  </p>

                  <p>
                    Якщо у вас є побажання щодо декору, напишіть їх у коментарі
                    до замовлення.
                  </p>
                </div>

                <div className="bg-muted mt-8 rounded-[1.5rem] p-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-foreground h-5 w-5" />
                    <p className="text-foreground text-sm font-bold">
                      Самовивіз: м. Черкаси, вул. Шоколадна, 12
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <Clock3 className="text-foreground h-5 w-5" />
                    <p className="text-foreground text-sm font-bold">
                      Щодня · 08:00 — 21:00
                    </p>
                  </div>
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

function DeliveryCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType
  title: string
  text: string
}) {
  return (
    <div className="border-border bg-card/80 rounded-[2rem] border p-6 shadow-sm backdrop-blur">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-foreground mt-5 text-2xl font-extrabold tracking-[-0.045em]">
        {title}
      </h3>

      <p className="text-muted-foreground mt-3 text-sm leading-7">{text}</p>
    </div>
  )
}

function MiniInfo({
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

function Step({
  number,
  title,
  text,
}: {
  number: string
  title: string
  text: string
}) {
  return (
    <div className="bg-background flex gap-4 rounded-[1.5rem] p-4">
      <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold">
        {number}
      </div>

      <div>
        <h3 className="text-foreground font-extrabold tracking-[-0.025em]">
          {title}
        </h3>

        <p className="text-muted-foreground mt-1 text-sm leading-6">{text}</p>
      </div>
    </div>
  )
}
