"use client"

import * as React from "react"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CakeSlice,
  Check,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/shared/Container"

const sizes = [
  { label: "1 кг", servings: "6–8 гостей", price: 950 },
  { label: "1.5 кг", servings: "8–12 гостей", price: 1350 },
  { label: "2 кг", servings: "12–16 гостей", price: 1700 },
  { label: "3 кг", servings: "18–24 гостей", price: 2450 },
]

const shapes = [
  { label: "Круглий", price: 0 },
  { label: "Серце", price: 180 },
  { label: "Ярусний", price: 450 },
]

const fillings = [
  { label: "Шоколад-вишня", price: 0 },
  { label: "Фісташка-малина", price: 180 },
  { label: "Ваніль-ягода", price: 120 },
  { label: "Карамель-горіх", price: 150 },
  { label: "Чізкейк", price: 100 },
]

const decorations = [
  { label: "Ягоди", price: 180 },
  { label: "Свічки", price: 80 },
  { label: "Напис", price: 60 },
  { label: "Квіти", price: 250 },
  { label: "Шоколадний декор", price: 160 },
  { label: "Подарункове пакування", price: 120 },
]

const occasions = [
  "День народження",
  "Весілля",
  "Подарунок",
  "Дитяче свято",
  "Інше",
]

const steps = ["Основа", "Смак", "Декор", "Деталі"]

export function CakeConstructor() {
  const [step, setStep] = React.useState(0)
  const [size, setSize] = React.useState(sizes[0])
  const [shape, setShape] = React.useState(shapes[0])
  const [filling, setFilling] = React.useState(fillings[0])
  const [occasion, setOccasion] = React.useState(occasions[0])
  const [selectedDecorations, setSelectedDecorations] = React.useState<
    string[]
  >([])
  const [cakeText, setCakeText] = React.useState("")
  const [date, setDate] = React.useState("")
  const [comment, setComment] = React.useState("")

  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState("")

  async function submitRequest() {
    setError("")
    setIsLoading(true)

    const payload = {
      size: size.label,
      shape: shape.label,
      filling: filling.label,
      occasion,
      decorations: selectedDecorations,
      cakeText,
      date,
      comment,
      total,
    }

    const response = await fetch("/api/cake-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    setIsLoading(false)

    if (!response.ok) {
      setError("Не вдалося відправити заявку. Спробуйте ще раз.")
      return
    }

    setIsSuccess(true)
  }

  const selectedDecorationItems = decorations.filter((item) =>
    selectedDecorations.includes(item.label)
  )

  const decorationTotal = selectedDecorationItems.reduce(
    (sum, item) => sum + item.price,
    0
  )

  const total = size.price + shape.price + filling.price + decorationTotal

  function toggleDecoration(label: string) {
    setSelectedDecorations((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    )
  }

  function nextStep() {
    setStep((value) => Math.min(value + 1, steps.length - 1))
  }

  function previousStep() {
    setStep((value) => Math.max(value - 1, 0))
  }

  return (
    <section className="bg-background py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mb-8">
          <div className="border-border bg-card text-muted-foreground mb-5 inline-flex w-fit rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
            Конструктор торта
          </div>

          <h1 className="text-foreground max-w-4xl text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Зберіть торт для вашої події
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-8 font-medium sm:text-lg">
            Оберіть вагу, форму, начинку та декор. Ми отримаємо заявку й
            звʼяжемось для уточнення деталей.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="border-border bg-card/70 rounded-[2rem] border p-4 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur sm:p-6 lg:rounded-[3rem] lg:p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between gap-3">
                {steps.map((item, index) => {
                  const active = index === step
                  const completed = index < step

                  return (
                    <div key={item} className="flex flex-1 items-center gap-2">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition ${
                          active || completed
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {completed ? <Check className="h-4 w-4" /> : index + 1}
                      </div>

                      <div className="hidden min-w-0 sm:block">
                        <p
                          className={`truncate text-sm font-bold ${
                            active ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {item}
                        </p>
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={`h-px flex-1 ${
                            completed ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {step === 0 && (
              <div>
                <StepHeader
                  icon={CakeSlice}
                  title="Оберіть основу"
                  text="Вага та форма впливають на розмір, кількість порцій і фінальну вартість."
                />

                <div className="mt-6">
                  <SectionTitle title="Вага" />

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {sizes.map((item) => (
                      <ChoiceCard
                        key={item.label}
                        active={size.label === item.label}
                        title={item.label}
                        text={item.servings}
                        price={`від ${item.price}₴`}
                        onClick={() => setSize(item)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <SectionTitle title="Форма" />

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {shapes.map((item) => (
                      <ChoiceCard
                        key={item.label}
                        active={shape.label === item.label}
                        title={item.label}
                        text={item.price ? `+${item.price}₴` : "без доплати"}
                        onClick={() => setShape(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <StepHeader
                  icon={Heart}
                  title="Оберіть смак"
                  text="Начинка — головний характер торта. Можна обрати класичну або більш авторську."
                />

                <div className="mt-6">
                  <SectionTitle title="Начинка" />

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {fillings.map((item) => (
                      <ChoiceCard
                        key={item.label}
                        active={filling.label === item.label}
                        title={item.label}
                        text={item.price ? `+${item.price}₴` : "базова ціна"}
                        onClick={() => setFilling(item)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <SectionTitle title="Подія" />

                  <div className="mt-3 flex flex-wrap gap-2">
                    {occasions.map((item) => {
                      const active = occasion === item

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setOccasion(item)}
                          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <StepHeader
                  icon={Sparkles}
                  title="Додайте декор"
                  text="Оберіть деталі, які зроблять торт більш святковим і персональним."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {decorations.map((item) => {
                    const active = selectedDecorations.includes(item.label)

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => toggleDecoration(item.label)}
                        className={`flex items-center justify-between gap-4 rounded-[1.5rem] border p-4 text-left transition ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        <div>
                          <p className="font-extrabold">{item.label}</p>
                          <p
                            className={`mt-1 text-sm ${
                              active
                                ? "text-primary-foreground/75"
                                : "text-muted-foreground"
                            }`}
                          >
                            +{item.price}₴
                          </p>
                        </div>

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                            active
                              ? "border-primary-foreground bg-primary-foreground text-primary"
                              : "border-border"
                          }`}
                        >
                          {active && <Check className="h-4 w-4" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <StepHeader
                  icon={MessageCircle}
                  title="Деталі заявки"
                  text="Залиште дату, напис і побажання. Ми звʼяжемось, щоб підтвердити замовлення."
                />

                <div className="mt-6 grid gap-5">
                  <div>
                    <SectionTitle title="Дата отримання" />

                    <div className="relative mt-3">
                      <CalendarDays className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                      <Input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        className="border-border/70 bg-background h-14 rounded-2xl pl-12 text-[15px] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Напис на торті" />

                    <Input
                      value={cakeText}
                      onChange={(event) => setCakeText(event.target.value)}
                      placeholder="Наприклад: З днем народження"
                      className="border-border/70 bg-background mt-3 h-14 rounded-2xl px-5 text-[15px] font-medium"
                    />
                  </div>

                  <div>
                    <SectionTitle title="Коментар" />

                    <Textarea
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      placeholder="Опишіть побажання щодо декору, кольорів або референсів"
                      className="border-border/70 bg-background mt-3 min-h-32 resize-none rounded-[1.5rem] p-4 text-[15px] font-medium"
                    />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <p className="bg-destructive/10 text-destructive mt-6 rounded-2xl px-4 py-3 text-sm font-bold">
                {error}
              </p>
            )}

            {isSuccess && (
              <div className="border-border bg-background mt-6 rounded-[1.5rem] border p-5">
                <p className="text-foreground text-xl font-extrabold tracking-[-0.04em]">
                  Заявку відправлено 🎂
                </p>

                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Ми отримали вашу заявку на торт і скоро звʼяжемось для
                  уточнення деталей.
                </p>
              </div>
            )}
            <div className="border-border bg-card/95 sticky bottom-0 z-20 -mx-4 mt-8 flex gap-3 border-t p-4 backdrop-blur sm:-mx-6 lg:-mx-8">
              <Button
                type="button"
                variant="outline"
                className="bg-background h-12 flex-1"
                disabled={step === 0}
                onClick={previousStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>

              {step < steps.length - 1 ? (
                <Button
                  type="button"
                  className="h-12 flex-1"
                  onClick={nextStep}
                >
                  Далі
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="h-12 flex-1"
                  disabled={isLoading}
                  onClick={submitRequest}
                >
                  {isLoading ? "Відправляємо..." : "Надіслати заявку"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <aside className="border-border bg-card/80 h-fit rounded-[2rem] border p-5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur lg:sticky lg:top-28">
            <p className="text-muted-foreground text-sm font-bold tracking-[0.18em] uppercase">
              Ваш торт
            </p>

            <div className="bg-muted mt-4 rounded-[1.5rem] p-5">
              <p className="text-foreground text-5xl font-extrabold tracking-[-0.06em]">
                {total}₴
              </p>
              <p className="text-muted-foreground mt-2 text-sm font-medium">
                Орієнтовна ціна. Фінальну суму підтвердить менеджер.
              </p>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              <SummaryRow label="Вага" value={size.label} />
              <SummaryRow label="Форма" value={shape.label} />
              <SummaryRow label="Начинка" value={filling.label} />
              <SummaryRow label="Подія" value={occasion} />
              <SummaryRow
                label="Декор"
                value={
                  selectedDecorations.length
                    ? selectedDecorations.join(", ")
                    : "Без додаткового декору"
                }
              />
              <SummaryRow label="Дата" value={date || "Не обрано"} />
              <SummaryRow label="Напис" value={cakeText || "Без напису"} />
            </div>

            <div className="border-border bg-background mt-6 rounded-[1.5rem] border p-4">
              <p className="text-foreground text-sm font-bold">Що буде далі?</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Після заявки ми уточнимо деталі, підтвердимо дату, декор і
                фінальну вартість.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

function StepHeader({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType
  title: string
  text: string
}) {
  return (
    <div className="flex gap-4">
      <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        <Icon className="text-foreground h-5 w-5" />
      </div>

      <div>
        <h2 className="text-foreground text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          {text}
        </p>
      </div>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-muted-foreground text-sm font-bold tracking-[0.18em] uppercase">
      {title}
    </h3>
  )
}

function ChoiceCard({
  active,
  title,
  text,
  price,
  onClick,
}: {
  active: boolean
  title: string
  text: string
  price?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.5rem] border p-4 text-left transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-extrabold">{title}</p>
          <p
            className={`mt-1 text-sm ${
              active ? "text-primary-foreground/75" : "text-muted-foreground"
            }`}
          >
            {text}
          </p>
        </div>

        {active && <Check className="h-5 w-5 shrink-0" />}
      </div>

      {price && (
        <p
          className={`mt-4 text-sm font-bold ${
            active ? "text-primary-foreground/85" : "text-foreground"
          }`}
        >
          {price}
        </p>
      )}
    </button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground font-bold">{label}</span>
      <span className="text-foreground max-w-[190px] text-right font-extrabold">
        {value}
      </span>
    </div>
  )
}
