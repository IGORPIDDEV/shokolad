"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, MapPin, Phone, ShoppingBag, User, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useCartStore } from "@/store/cart-store"
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/features/checkout/schemas/checkout-schema"

type CheckoutSheetProps = {
  children: React.ReactNode
}

const inputWithIconClassName =
  "h-14 rounded-2xl border-border/70 bg-[#FCF8F4] pl-12 text-[15px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] placeholder:text-muted-foreground/40 focus-visible:border-[#C58A5C] focus-visible:ring-1 focus-visible:ring-[#C58A5C]/30"

const textareaClassName =
  "min-h-32 resize-none rounded-[1.75rem] border-border/70 bg-[#FCF8F4] p-4 text-[15px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] placeholder:text-muted-foreground/40 focus-visible:border-[#C58A5C] focus-visible:ring-1 focus-visible:ring-[#C58A5C]/30"

const labelClassName =
  "text-[13px] font-semibold tracking-[0.01em] text-muted-foreground"

export function CheckoutSheet({ children }: CheckoutSheetProps) {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [successTotal, setSuccessTotal] = React.useState(0)

  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())
  const clear = useCartStore((state) => state.clear)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      deliveryType: "pickup",
      address: "",
      comment: "",
    },
  })

  const deliveryType = watch("deliveryType")

  async function onSubmit(values: CheckoutFormValues) {
    setError("")
    setIsLoading(true)

    const payload = {
      ...values,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    setIsLoading(false)

    if (!response.ok) {
      setError("Не вдалося відправити замовлення. Спробуйте ще раз.")
      return
    }

    setSuccessTotal(total)
    setIsSuccess(true)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="bottom"
        className="border-border bg-background mx-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] p-0 [&>button]:hidden"
      >
        <SheetClose asChild>
          <button
            type="button"
            className="bg-background/80 text-foreground hover:bg-background absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:scale-105"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetClose>

        {isSuccess ? (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,138,92,0.18),transparent_45%)]" />

            <div className="relative z-10 w-full max-w-md">
              <div className="border-border bg-card mx-auto flex h-24 w-24 items-center justify-center rounded-full border shadow-[0_20px_60px_rgba(58,36,28,0.12)]">
                <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
              </div>

              <p className="text-muted-foreground mt-8 text-[11px] font-extrabold tracking-[0.24em] uppercase">
                Замовлення оформлено
              </p>

              <h2 className="text-foreground mt-3 text-4xl leading-[0.95] font-black tracking-[-0.065em] sm:text-5xl">
                Дякуємо за
                <br />
                ваше замовлення
              </h2>

              <p className="text-muted-foreground mx-auto mt-5 max-w-md text-base leading-7 font-medium">
                Ми вже отримали ваше замовлення та скоро звʼяжемось для
                підтвердження.
              </p>

              <div className="border-border bg-card/80 mt-8 rounded-[1.75rem] border p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground text-sm font-bold">
                    Сума замовлення
                  </span>

                  <span className="text-foreground text-2xl font-black tracking-[-0.045em]">
                    {successTotal}₴
                  </span>
                </div>
              </div>

              <SheetClose asChild>
                <Button
                  className="mt-8 w-full"
                  onClick={() => {
                    clear()
                    setIsSuccess(false)
                  }}
                >
                  Повернутись на сайт
                </Button>
              </SheetClose>
            </div>
          </div>
        ) : (
          <>
            <div className="border-border border-b px-5 py-5">
              <SheetHeader className="text-left">
                <SheetTitle className="text-foreground text-3xl font-extrabold tracking-[-0.055em]">
                  Оформлення
                </SheetTitle>

                <SheetDescription className="text-muted-foreground mt-1 text-sm font-medium">
                  Заповніть дані, щоб ми могли підтвердити замовлення.
                </SheetDescription>
              </SheetHeader>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                <div className="border-border bg-card rounded-[1.75rem] border p-4">
                  <p className="text-muted-foreground mb-4 text-sm font-bold">
                    Ваші дані
                  </p>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={labelClassName}>
                        Імʼя
                      </Label>

                      <div className="relative">
                        <User className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />

                        <Input
                          id="name"
                          placeholder="Марія"
                          className={inputWithIconClassName}
                          {...register("name")}
                        />
                      </div>

                      {errors.name && (
                        <p className="text-destructive text-sm font-bold">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className={labelClassName}>
                        Телефон
                      </Label>

                      <div className="relative">
                        <Phone className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />

                        <PatternFormat
                          format="+38 (###) ### ## ##"
                          mask="_"
                          allowEmptyFormatting={false}
                          value={watch("phone")}
                          onValueChange={(values) => {
                            setValue("phone", values.formattedValue, {
                              shouldValidate: true,
                            })
                          }}
                          customInput={Input}
                          type="tel"
                          inputMode="tel"
                          placeholder="(xxx) xxx xx xx"
                          className={inputWithIconClassName}
                        />
                      </div>

                      {errors.phone && (
                        <p className="text-destructive text-sm font-bold">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-border bg-card mt-4 rounded-[1.75rem] border p-4">
                  <p className="text-muted-foreground mb-4 text-sm font-bold">
                    Спосіб отримання
                  </p>

                  <RadioGroup
                    value={deliveryType}
                    onValueChange={(value) =>
                      setValue(
                        "deliveryType",
                        value as CheckoutFormValues["deliveryType"],
                        { shouldValidate: true }
                      )
                    }
                    className="grid gap-3"
                  >
                    <Label className="border-border bg-background flex cursor-pointer items-center gap-3 rounded-2xl border p-4">
                      <RadioGroupItem value="pickup" />

                      <div>
                        <p className="text-foreground font-bold">Самовивіз</p>
                        <p className="text-muted-foreground text-sm">
                          Забрати з кавʼярні
                        </p>
                      </div>
                    </Label>

                    <Label className="border-border bg-background flex cursor-pointer items-center gap-3 rounded-2xl border p-4">
                      <RadioGroupItem value="delivery" />

                      <div>
                        <p className="text-foreground font-bold">Доставка</p>
                        <p className="text-muted-foreground text-sm">
                          Курʼєром по місту
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>

                  {deliveryType === "delivery" && (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="address" className={labelClassName}>
                        Адреса доставки
                      </Label>

                      <div className="relative">
                        <MapPin className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />

                        <Input
                          id="address"
                          placeholder="Вулиця, будинок, квартира"
                          className={inputWithIconClassName}
                          {...register("address")}
                        />
                      </div>

                      {errors.address && (
                        <p className="text-destructive text-sm font-bold">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-border bg-card mt-4 rounded-[1.75rem] border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment" className={labelClassName}>
                      Коментар
                    </Label>

                    <Textarea
                      id="comment"
                      placeholder="Побажання до замовлення..."
                      className={textareaClassName}
                      {...register("comment")}
                    />

                    {errors.comment && (
                      <p className="text-destructive text-sm font-bold">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-border bg-card mt-4 rounded-[1.75rem] border p-4">
                  <p className="text-muted-foreground mb-3 text-sm font-bold">
                    Замовлення
                  </p>

                  <div className="grid gap-2">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-foreground font-medium">
                          {item.product.title} × {item.quantity}
                        </span>

                        <span className="text-foreground font-bold">
                          {item.product.price * item.quantity}₴
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-border bg-background/90 shrink-0 border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-bold">
                    Разом
                  </span>

                  <span className="text-foreground text-2xl font-extrabold tracking-[-0.045em]">
                    {total}₴
                  </span>
                </div>

                {error && (
                  <p className="bg-destructive/10 text-destructive mb-3 rounded-2xl px-4 py-3 text-sm font-bold">
                    {error}
                  </p>
                )}

                <Button
                  className="w-full"
                  type="submit"
                  disabled={isLoading || items.length === 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isLoading ? "Відправляємо..." : "Підтвердити замовлення"}
                </Button>
              </div>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
