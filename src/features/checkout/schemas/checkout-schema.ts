// src/features/checkout/schemas/checkout-schema.ts
import { z } from "zod"

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, "Вкажіть імʼя").max(80),
    phone: z
    .string()
    .trim()
    .regex(
        /^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/,
        "Введіть коректний номер"
    ),
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