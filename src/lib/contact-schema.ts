import { z } from "zod";

/** Темы обращения — ровно как в CLAUDE.md, раздел 7. */
export const CONTACT_TOPICS = ["Партнёрство", "СМИ", "Архивные материалы", "Другое"] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100, "Имя слишком длинное — до 100 символов"),
  email: z.string().trim().min(1, "Введите email").email("Введите корректный email"),
  topic: z.enum(CONTACT_TOPICS, { error: "Выберите тему обращения" }),
  message: z
    .string()
    .trim()
    .min(10, "Сообщение слишком короткое — минимум 10 символов")
    .max(5000, "Сообщение слишком длинное — до 5000 символов"),
  consent: z.literal(true, { error: "Нужно согласие на обработку персональных данных" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
