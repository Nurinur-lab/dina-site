import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { club } from "@/lib/content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

/**
 * Шаблон по 152-ФЗ «О персональных данных». Реквизиты оператора в
 * content/club.json → requisites пока null — до подтверждения владельцем
 * показывается явный плейсхолдер (CLAUDE.md, раздел 2, правило 6).
 */
export default function PolitikaPage() {
  const requisites = club.requisites;

  return (
    <main>
      <Breadcrumbs current="Политика конфиденциальности" />
      <PageHeader title="Политика конфиденциальности" />

      <article className="container-site flex flex-col gap-10 pb-20 md:pb-28">
        {!requisites && (
          <p className="border-pushkar/40 bg-night-2 text-ivory/80 border px-5 py-4 text-sm">
            Черновик страницы: реквизиты оператора персональных данных ещё не подтверждены
            владельцем клуба (см. <code>content/club.json → requisites</code>). До подтверждения
            вместо них показаны плейсхолдеры — страницу нельзя публиковать в таком виде.
          </p>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">1. Общие положения</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Настоящая политика определяет порядок обработки персональных данных посетителей сайта{" "}
            {club.shortName} (далее — «Сайт») и действует в соответствии с Федеральным законом от
            27.07.2006 № 152-ФЗ «О персональных данных».
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">2. Оператор персональных данных</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Оператором является:{" "}
            {requisites?.legalName ?? "[полное юридическое наименование — ожидает подтверждения]"},
            ИНН {requisites?.inn ?? "[ожидает подтверждения]"}, ОГРН{" "}
            {requisites?.ogrn ?? "[ожидает подтверждения]"}, адрес:{" "}
            {requisites?.legalAddress ?? "[ожидает подтверждения]"}.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">3. Какие данные обрабатываются</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            При заполнении формы обращения на странице «Клуб и контакты» Сайт получает имя, адрес
            электронной почты и текст сообщения, которые пользователь указывает добровольно. Сайт не
            запрашивает и не обрабатывает специальные категории персональных данных.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">4. Цели обработки</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Данные обрабатываются исключительно для того, чтобы ответить на обращение, направленное
            через форму на Сайте, и не используются для рассылок или иных целей без отдельного
            согласия.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">5. Передача третьим лицам</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Для доставки писем с формы обращения Сайт использует почтовый сервис (SMTP-провайдер),
            который выступает в роли обработчика данных по поручению оператора. Данные не передаются
            третьим лицам в иных целях, за исключением случаев, прямо предусмотренных
            законодательством Российской Федерации.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">6. Срок хранения</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Переписка по обращениям хранится не дольше срока, необходимого для ответа на обращение и
            соблюдения требований законодательства об архивном хранении переписки.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">7. Файлы cookie и статистика</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Сайт использует технически необходимые cookie для работы базовых функций. Счётчик
            Яндекс.Метрики подключается только после явного согласия, данного в баннере cookie, и
            может быть отозван в любой момент путём очистки cookie браузера.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">8. Права субъекта персональных данных</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Пользователь вправе запросить у оператора информацию об обработке своих персональных
            данных, потребовать их уточнения, блокирования или уничтожения в случаях,
            предусмотренных законом, а также отозвать согласие на обработку, направив обращение по
            контактам, указанным на странице «Клуб и контакты».
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">9. Изменение политики</h2>
          <p className="text-ivory/85 max-w-[70ch] leading-relaxed">
            Оператор вправе изменять эту политику; актуальная версия всегда доступна по этому
            адресу.
          </p>
        </section>
      </article>
    </main>
  );
}
