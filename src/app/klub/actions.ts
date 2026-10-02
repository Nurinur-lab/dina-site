"use server";

import { headers } from "next/headers";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
  formError?: string;
};

const MIN_FILL_TIME_MS = 3000;

/**
 * Server Action формы обращения (CLAUDE.md, раздел 7).
 * Антиспам: скрытое поле-ловушка + минимальное время заполнения — при их
 * срабатывании тихо возвращаем «успех», не выдавая боту, что его поймали.
 * Настоящая защита — лимит отправок по IP и Zod-валидация.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const renderedAt = Number(formData.get("renderedAt"));
  if (!renderedAt || Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      formError: "Слишком много сообщений с вашего адреса за последний час. Попробуйте позже.",
    };
  }

  const result = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    consent: formData.get("consent") === "on",
  });

  if (!result.success) {
    return { status: "error", fieldErrors: result.error.flatten().fieldErrors };
  }

  try {
    await sendContactEmail(result.data);
  } catch (error) {
    console.error("[forma-obrashcheniya] Не удалось отправить письмо:", error);
    return {
      status: "error",
      formError: "Не удалось отправить сообщение. Попробуйте позже или напишите нам напрямую.",
    };
  }

  return { status: "success" };
}
