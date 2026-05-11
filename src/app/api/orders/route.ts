import { NextResponse } from "next/server"
import { z } from "zod"

import { products } from "@/data/products"

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  deliveryType: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(200).optional(),
  comment: z.string().trim().max(500).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1)
    .max(30),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = orderSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid order data", errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const order = parsed.data

    if (order.deliveryType === "delivery" && !order.address?.trim()) {
      return NextResponse.json(
        { message: "Address is required for delivery" },
        { status: 400 }
      )
    }

    const orderItems = order.items.map((item) => {
      const product = products.find((product) => product.id === item.productId)

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`)
      }

      return {
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        total: product.price * item.quantity,
      }
    })

    const total = orderItems.reduce((sum, item) => sum + item.total, 0)

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { message: "Telegram is not configured" },
        { status: 500 }
      )
    }

    const message = formatOrderMessage({
      ...order,
      items: orderItems,
      total,
    })

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { message: "Telegram request failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Order API error:", error)

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

function formatOrderMessage(order: {
  name: string
  phone: string
  deliveryType: "pickup" | "delivery"
  address?: string
  comment?: string
  items: {
    title: string
    price: number
    quantity: number
    total: number
  }[]
  total: number
}) {
  const delivery =
    order.deliveryType === "delivery"
      ? `Доставка\nАдреса: ${escapeHtml(order.address)}`
      : "Самовивіз"

  const items = order.items
    .map(
      (item) =>
        `• ${escapeHtml(item.title)} × ${item.quantity} — ${item.total}₴`
    )
    .join("\n")

  return `
🛒 <b>Нове замовлення</b>

👤 <b>Імʼя:</b> ${escapeHtml(order.name)}
📞 <b>Телефон:</b> ${escapeHtml(order.phone)}

🚚 <b>Отримання:</b> ${delivery}

<b>Товари:</b>
${items}

💰 <b>Разом:</b> ${order.total}₴

💬 <b>Коментар:</b>
${escapeHtml(order.comment)}
`.trim()
}

function escapeHtml(value?: string) {
  return String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}