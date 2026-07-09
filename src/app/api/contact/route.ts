import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactIntent = "project" | "hiring";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  intent?: unknown;
  locale?: unknown;
  page?: unknown;
  website?: unknown; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;
const MAX_PAGE = 200;

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill this; humans leave it empty.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, MAX_NAME);
  const email = asTrimmedString(body.email, MAX_EMAIL);
  const message = asTrimmedString(body.message, MAX_MESSAGE);
  const locale = asTrimmedString(body.locale, 16) ?? "es";
  const page = asTrimmedString(body.page, MAX_PAGE) ?? "unknown";
  const intent =
    body.intent === "project" || body.intent === "hiring"
      ? (body.intent as ContactIntent)
      : null;

  if (!name || !email || !message || !intent || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation_error" }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "webhook_missing" }, { status: 503 });
  }

  const title =
    intent === "hiring"
      ? "Lead hiring (CV)"
      : "Lead proyecto (servicios)";
  const color = intent === "hiring" ? 0x5865f2 : 0x0d9488;

  const discordPayload = {
    embeds: [
      {
        title,
        color,
        fields: [
          { name: "Nombre", value: name, inline: true },
          { name: "Email", value: email, inline: true },
          { name: "Intent", value: intent, inline: true },
          { name: "Locale", value: locale, inline: true },
          { name: "Página", value: page, inline: true },
          { name: "Mensaje", value: message.slice(0, 1024) },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!discordRes.ok) {
      return NextResponse.json({ ok: false, error: "discord_error" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "discord_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
