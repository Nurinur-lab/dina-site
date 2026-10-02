import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  // Золото короны — главная кнопка, используется редко (раздел 5 CLAUDE.md).
  primary: "bg-crown text-night hover:bg-crown/90",
  secondary: "border border-ivory/30 text-ivory hover:border-ivory",
  ghost: "text-ivory/80 hover:text-ivory underline underline-offset-4",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({ variant = "secondary", href, className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
