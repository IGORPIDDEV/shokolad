import { NextResponse } from "next/server"

type OrderItem = {
  title: string
  price: number
  quantity: number
}

type OrderPayload = {
  name: string
  phone: string
  deliveryType: "pickup" | "delivery"
  address?: string
  comment?: string
  items: OrderItem[]
  total: number
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload

    if (!body.name || !body.phone || !body.items?.length) {
      return NextResponse.json(
        { message: "Invalid order data" },
        { status: 400 }
      )
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { message: "Telegram is not configured" },
        { status: 500 }
      )
    }

    const message = formatOrderMessage(body)

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
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

function formatOrderMessage(order: OrderPayload) {
  const delivery =
    order.deliveryType === "delivery"
      ? `Доставка\nАдреса: ${escapeHtml(order.address || "-")}`
      : "Самовивіз"

  const items = order.items
    .map(
      (item) =>
        `• ${escapeHtml(item.title)} × ${item.quantity} — ${
          item.price * item.quantity
        }₴`
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
${escapeHtml(order.comment || "-")}
`.trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}