"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/klub/actions";
import { CONTACT_TOPICS } from "@/lib/contact-schema";

/**
 * Форма обращения (CLAUDE.md, раздел 7): Server Action, Zod-валидация на
 * сервере, антиспам (скрытая ловушка + минимальное время заполнения + лимит
 * по IP — всё в `actions.ts`). Здесь — разметка, ошибки у полей и состояние
 * отправки.
 *
 * Поля — контролируемые: React 19 сам сбрасывает <form action={...}> после
 * вызова Server Action (это штатное поведение, не баг), а при ошибке
 * валидации сброс стирал бы весь ввод пользователя. Для текстовых полей
 * контролируемого value достаточно, но нативный `form.reset()` всё равно
 * физически сбрасывает DOM-свойства `checked`/`selected` у чекбокса и
 * select (React не всегда перевыставляет их заново, если само значение
 * пропса не поменялось) — поэтому после каждого ответа экшена досинхронизируем
 * их руками через refs.
 */
const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "border-ivory/30 focus:border-pushkar bg-night-2 border px-4 py-3 outline-none aria-invalid:border-pushkar";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  // Фиксируем момент показа формы один раз — используется антиспам-проверкой минимального времени заполнения.
  const [renderedAt] = useState(() => Date.now());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const topicRef = useRef<HTMLSelectElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (topicRef.current) topicRef.current.value = topic;
    if (consentRef.current) consentRef.current.checked = consent;
  }, [state, topic, consent]);

  if (state.status === "success") {
    return (
      <div role="status" className="border-field/50 bg-night-2 border px-5 py-6">
        <p className="text-lg font-medium">Сообщение отправлено</p>
        <p className="text-mist mt-1 text-sm">Спасибо! Мы ответим на указанный вами email.</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex max-w-xl flex-col gap-6">
      <input type="hidden" name="renderedAt" value={renderedAt} />

      {/* Поле-ловушка для ботов: скрыто визуально и от скринридеров, но доступно для автозаполнения формами-роботами. */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="company">Компания</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.formError && (
        <p role="alert" className="border-pushkar/50 bg-night-2 border px-4 py-3 text-sm">
          {state.formError}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className={inputClass}
        />
        {state.fieldErrors?.name && (
          <p id="name-error" className="text-pushkar text-sm">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className={inputClass}
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-pushkar text-sm">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm">
          Тема
        </label>
        <select
          id="topic"
          name="topic"
          required
          ref={topicRef}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          aria-invalid={!!state.fieldErrors?.topic}
          aria-describedby={state.fieldErrors?.topic ? "topic-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Выберите тему
          </option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {state.fieldErrors?.topic && (
          <p id="topic-error" className="text-pushkar text-sm">
            {state.fieldErrors.topic[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className={inputClass}
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="text-pushkar text-sm">
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
            ref={consentRef}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={!!state.fieldErrors?.consent}
            aria-describedby={state.fieldErrors?.consent ? "consent-error" : undefined}
            className="border-ivory/30 mt-1 h-4 w-4 shrink-0"
          />
          <span>
            Согласен(на) на обработку персональных данных в соответствии с{" "}
            <a href="/politika" className="text-pushkar underline underline-offset-2">
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <p id="consent-error" className="text-pushkar text-sm">
            {state.fieldErrors.consent[0]}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-crown text-night px-6 py-3 text-sm font-medium tracking-wide uppercase disabled:opacity-60"
        >
          {isPending ? "Отправка…" : "Отправить сообщение"}
        </button>
      </div>
    </form>
  );
}
