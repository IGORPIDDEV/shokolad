import Image from "next/image"
import { CakeSlice, Coffee, Heart, Sparkles } from "lucide-react"

import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"
import { Container } from "@/components/shared/Container"

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
                    Про нас
                  </div>

                  <h1 className="text-foreground text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                    Створюємо солодкі моменти щодня
                  </h1>

                  <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 font-medium sm:text-lg">
                    «Шоколад» — це кавʼярня про теплі зустрічі, добірну каву,
                    авторські десерти та торти, які хочеться дарувати близьким.
                  </p>
                </div>

                <div className="border-border bg-muted relative min-h-[360px] overflow-hidden rounded-[1.75rem] border lg:min-h-[520px]">
                  <Image
                    src="/images/categories/cakes.png"
                    alt="Кавʼярня Шоколад"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

                  <div className="bg-background/80 absolute right-5 bottom-5 left-5 rounded-[1.5rem] border border-white/20 p-5 backdrop-blur-xl">
                    <p className="text-muted-foreground text-sm font-bold tracking-[0.18em] uppercase">
                      Coffee & desserts
                    </p>

                    <p className="text-foreground mt-2 text-2xl font-extrabold tracking-[-0.045em]">
                      Смак, атмосфера і турбота в кожній деталі.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              <ValueCard
                icon={Coffee}
                title="Добірна кава"
                text="Працюємо з якісним зерном і готуємо класичні та сезонні напої."
              />

              <ValueCard
                icon={CakeSlice}
                title="Власні десерти"
                text="Готуємо щодня, щоб десерти були свіжими, ніжними та красивими."
              />

              <ValueCard
                icon={Heart}
                title="З любовʼю"
                text="Дбаємо про смак, подачу і відчуття, з якими ви йдете від нас."
              />

              <ValueCard
                icon={Sparkles}
                title="Особливі події"
                text="Створюємо торти та солодкі набори для свят і подарунків."
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-border bg-card/80 rounded-[2rem] border p-6 shadow-sm backdrop-blur sm:p-8">
                <p className="text-muted-foreground text-sm font-bold tracking-[0.18em] uppercase">
                  Наша історія
                </p>

                <h2 className="text-foreground mt-4 text-4xl leading-[0.95] font-extrabold tracking-[-0.055em]">
                  Маленька кавʼярня з великою любовʼю до десертів
                </h2>
              </div>

              <div className="border-border bg-card/80 rounded-[2rem] border p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="text-muted-foreground space-y-5 text-base leading-8 font-medium">
                  <p>
                    Ми починали з простого бажання — створити місце, куди
                    хочеться повертатися за кавою, десертом і хорошим настроєм.
                  </p>

                  <p>
                    У меню поєднуємо класику та авторські смаки: шоколадні
                    десерти, фісташкові поєднання, сезонні напої й торти на
                    замовлення.
                  </p>

                  <p>
                    Для нас важливо, щоб кожен гість відчував турботу — від
                    першого ковтка кави до останньої ложечки десерту.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-border bg-primary text-primary-foreground mt-6 rounded-[2rem] border p-6 shadow-[0_20px_80px_rgba(58,36,28,0.16)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] uppercase opacity-70">
                    Завітайте
                  </p>

                  <h2 className="mt-3 text-4xl leading-[0.95] font-extrabold tracking-[-0.055em] sm:text-5xl">
                    Приходьте на каву, залишайтесь заради атмосфери
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <Stat title="08:00" text="відкриваємось" />
                  <Stat title="Daily" text="свіжі десерти" />
                  <Stat title="100%" text="ручна робота" />
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

function ValueCard({
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

      <h3 className="text-foreground mt-5 text-xl font-extrabold tracking-[-0.045em]">
        {title}
      </h3>

      <p className="text-muted-foreground mt-3 text-sm leading-7">{text}</p>
    </div>
  )
}

function Stat({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-3xl font-extrabold tracking-[-0.05em]">{title}</p>
      <p className="mt-1 text-sm font-medium opacity-75">{text}</p>
    </div>
  )
}
