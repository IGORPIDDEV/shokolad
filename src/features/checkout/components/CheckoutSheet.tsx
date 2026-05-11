"use client"

import * as React from "react"
import { CheckCircle2, MapPin, Phone, ShoppingBag, User, X } from "lucide-react"

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

type CheckoutSheetProps = {
  children: React.ReactNode
}

export function CheckoutSheet({ children }: CheckoutSheetProps) {
  const [deliveryType, setDeliveryType] = React.useState("pickup")
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())
  const clear = useCartStore((state) => state.clear)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const payload = {
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        deliveryType,
        address: String(formData.get("address") || ""),
        comment: String(formData.get("comment") || ""),
        items: items.map((item) => ({
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        })),
        total,
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

    setIsSuccess(true)
    clear()
    }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="bottom"
        className="mx-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border-border bg-background p-0 [&>button]:hidden"
      >
        <SheetClose asChild>
          <button
            type="button"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-background/80 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:scale-105 hover:bg-background"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetClose>

        {isSuccess ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <CheckCircle2 className="h-10 w-10 text-foreground" />
            </div>

            <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.055em] text-foreground">
              Замовлення прийнято
            </h2>

            <p className="mt-3 max-w-sm text-base font-medium leading-7 text-muted-foreground">
              Дякуємо! Ми скоро звʼяжемось з вами для підтвердження.
            </p>

            <SheetClose asChild>
              <Button className="mt-8 w-full max-w-sm">
                Повернутись на сайт
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-5">
              <SheetHeader className="text-left">
                <SheetTitle className="text-3xl font-extrabold tracking-[-0.055em] text-foreground">
                  Оформлення
                </SheetTitle>

                <SheetDescription className="mt-1 text-sm font-medium text-muted-foreground">
                  Заповніть дані, щоб ми могли підтвердити замовлення.
                </SheetDescription>
              </SheetHeader>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                <div className="rounded-[1.75rem] border border-border bg-card p-4">
                  <p className="mb-4 text-sm font-bold text-muted-foreground">
                    Ваші дані
                  </p>

                  <div className="grid gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="name">Імʼя</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Марія"
                          className="h-12 rounded-full pl-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          required
                          type="tel"
                          placeholder="+380..."
                          className="h-12 rounded-full pl-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-border bg-card p-4">
                  <p className="mb-4 text-sm font-bold text-muted-foreground">
                    Спосіб отримання
                  </p>

                  <RadioGroup
                    value={deliveryType}
                    onValueChange={setDeliveryType}
                    className="grid gap-3"
                  >
                    <Label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-4">
                      <RadioGroupItem value="pickup" />
                      <div>
                        <p className="font-bold text-foreground">Самовивіз</p>
                        <p className="text-sm text-muted-foreground">
                          Забрати з кавʼярні
                        </p>
                      </div>
                    </Label>

                    <Label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-4">
                      <RadioGroupItem value="delivery" />
                      <div>
                        <p className="font-bold text-foreground">Доставка</p>
                        <p className="text-sm text-muted-foreground">
                          Курʼєром по місту
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>

                  {deliveryType === "delivery" && (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="address">Адреса доставки</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          required
                          placeholder="Вулиця, будинок, квартира"
                          className="h-12 rounded-full pl-11"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-border bg-card p-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment">Коментар</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      placeholder="Побажання до замовлення..."
                      className="min-h-28 resize-none rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-border bg-card p-4">
                  <p className="mb-3 text-sm font-bold text-muted-foreground">
                    Замовлення
                  </p>

                  <div className="grid gap-2">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="font-medium text-foreground">
                          {item.product.title} × {item.quantity}
                        </span>

                        <span className="font-bold text-foreground">
                          {item.product.price * item.quantity}₴
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-border bg-background/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">
                    Разом
                  </span>

                  <span className="text-2xl font-extrabold tracking-[-0.045em] text-foreground">
                    {total}₴
                  </span>
                </div>

                {error && (
                <p className="mb-3 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
                    {error}
                </p>
                )}

                <Button className="w-full" type="submit" disabled={isLoading}>
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