import { CONTACT_TOPICS } from "@/lib/contact-schema";

/**
 * Статическая замена ContactForm для превью на GitHub Pages (PREVIEW_STATIC=1).
 * Настоящая форма использует Server Action, который несовместим с `output: "export"`
 * (статический хостинг не может выполнять серверный код) — подменяется на этот
 * компонент через `turbopack.resolveAlias` в next.config.ts, поэтому серверный
 * код формы (actions.ts, mailer.ts, rate-limit.ts) не попадает в экспортируемую сборку.
 *
 * Поля повторяют настоящую форму визуально, но ничего никуда не отправляют —
 * кнопка задизейблена, вместо отправки показано явное сообщение.
 */
const inputClass = "border-ivory/30 bg-night-2 border px-4 py-3 outline-none opacity-60";

export function ContactForm() {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <p role="status" className="border-pushkar/50 bg-night-2 border px-4 py-3 text-sm">
        Это демо-версия сайта, форма заработает после запуска.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="name-preview" className="text-sm">
          Имя
        </label>
        <input id="name-preview" type="text" disabled className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email-preview" className="text-sm">
          Email
        </label>
        <input id="email-preview" type="email" disabled className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="topic-preview" className="text-sm">
          Тема
        </label>
        <select id="topic-preview" disabled defaultValue="" className={inputClass}>
          <option value="" disabled>
            Выберите тему
          </option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message-preview" className="text-sm">
          Сообщение
        </label>
        <textarea id="message-preview" disabled rows={5} className={inputClass} />
      </div>

      <div>
        <button
          type="button"
          disabled
          className="bg-crown text-night px-6 py-3 text-sm font-medium tracking-wide uppercase opacity-60"
        >
          Отправить сообщение
        </button>
      </div>
    </div>
  );
}
