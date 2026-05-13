import { NextResponse } from "next/server"
import { z } from "zod"

const cakeRequestSchema = z.object({
  size: z.string().min(1),
  shape: z.string().min(1),
  filling: z.string().min(1),
  occasion: z.string().min(1),
  decorations: z.array(z.string()).max(10),
  cakeText: z.string().max(120).optional(),
  date: z.string().optional(),
  comment: z.string().max(800).optional(),
  total: z.number().int().min(0),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = cakeRequestSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid cake request data" },
        { status: 400 }
      )
    }

    const data = parsed.data

    await sendTelegramMessage(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cake request API error:", error)

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

async function sendTelegramMessage(data: z.infer<typeof cakeRequestSchema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error("Telegram is not configured")
  }

  const message = formatCakeRequestMessage(data)

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
    throw new Error("Telegram request failed")
  }
}

function formatCakeRequestMessage(data: z.infer<typeof cakeRequestSchema>) {
  return `
🎂 <b>Нова заявка на торт</b>

⚖️ <b>Вага:</b> ${escapeHtml(data.size)}
🍰 <b>Форма:</b> ${escapeHtml(data.shape)}
🧁 <b>Начинка:</b> ${escapeHtml(data.filling)}
🎉 <b>Подія:</b> ${escapeHtml(data.occasion)}

✨ <b>Декор:</b>
${data.decorations.length ? data.decorations.map((item) => `• ${escapeHtml(item)}`).join("\n") : "-"}

📝 <b>Напис:</b> ${escapeHtml(data.cakeText)}
📅 <b>Дата:</b> ${escapeHtml(data.date)}

💰 <b>Орієнтовна ціна:</b> ${data.total}₴

💬 <b>Коментар:</b>
${escapeHtml(data.comment)}
`.trim()
}

function escapeHtml(value?: string) {
  return String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}
