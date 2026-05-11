// src/features/checkout/schemas/checkout-schema.ts
import { z } from "zod"

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, "Вкажіть імʼя").max(80),
    phone: z
      .string()
      .trim()
      .min(7, "Вкажіть телефон")
      .max(30)
      .regex(/^[\d\s()+-]+$/, "Некоректний телефон"),
    deliveryType: z.enum(["pickup", "delivery"]),
    address: z.string().trim().max(200).optional(),
    comment: z.string().trim().max(500).optional(),
  })
  .refine(
    (data) => data.deliveryType === "pickup" || Boolean(data.address?.trim()),
    {
      message: "Вкажіть адресу доставки",
      path: ["address"],
    }
  )

export type CheckoutFormValues = z.infer<typeof checkoutSchema>