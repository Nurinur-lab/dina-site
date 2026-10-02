/**
 * Форма обращения (CLAUDE.md, раздел 7). В фазе 3 — только разметка и поля.
 * Server Action, Zod-валидация и антиспам подключаются в фазе 4.
 */
const topics = ["Партнёрство", "СМИ", "Архивные материалы", "Другое"];

export function ContactForm() {
  return (
    <form className="flex max-w-xl flex-col gap-6">
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
          className="border-ivory/30 focus:border-pushkar bg-night-2 border px-4 py-3 outline-none"
        />
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
          className="border-ivory/30 focus:border-pushkar bg-night-2 border px-4 py-3 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm">
          Тема
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          className="border-ivory/30 focus:border-pushkar bg-night-2 border px-4 py-3 outline-none"
        >
          <option value="" disabled>
            Выберите тему
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
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
          className="border-ivory/30 focus:border-pushkar bg-night-2 border px-4 py-3 outline-none"
        />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consent"
          required
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

      <div>
        <button
          type="submit"
          className="bg-crown text-night px-6 py-3 text-sm font-medium tracking-wide uppercase"
        >
          Отправить сообщение
        </button>
      </div>
    </form>
  );
}
