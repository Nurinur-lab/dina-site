/**
 * Единый конфиг навигации. Шапка и мобильное меню строятся из него.
 *
 * Сюда же в V2/V3 добавятся пункты вроде «Состав», «Матчи», «Новости» —
 * без переписывания компонентов шапки/меню.
 */
export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/istoriya", label: "История" },
  { href: "/lyudi", label: "Люди" },
  { href: "/foto", label: "Фотографии" },
  { href: "/klub", label: "Клуб и контакты" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { href: "/politika", label: "Политика конфиденциальности" },
];
