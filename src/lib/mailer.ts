import nodemailer from "nodemailer";
import type { ContactFormValues } from "./contact-schema";

/**
 * Отправка письма с формы обращения (CLAUDE.md, раздел 7).
 * Если SMTP_HOST не задан — письмо просто пишется в лог сервера, а
 * пользователю всё равно показывается успех. Сборка и e2e не должны
 * требовать настоящего SMTP.
 */
export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } =
    process.env;

  const body = [
    `Имя: ${values.name}`,
    `Email: ${values.email}`,
    `Тема: ${values.topic}`,
    "",
    values.message,
  ].join("\n");

  if (!SMTP_HOST) {
    console.log(`[forma-obrashcheniya] SMTP не настроен — письмо в лог:\n${body}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE !== "false",
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: MAIL_FROM || "Сайт «Дины» <noreply@example.ru>",
    to: MAIL_TO || SMTP_USER,
    replyTo: values.email,
    subject: `Обращение с сайта: ${values.topic}`,
    text: body,
  });
}
