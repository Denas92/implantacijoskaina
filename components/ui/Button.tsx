import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  secondary:
    "bg-accent text-primary-dark shadow-card hover:bg-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  ghost:
    "border border-border bg-white/80 text-primary hover:bg-surface-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | (ComponentProps<"button"> & { href?: undefined })
);

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={cls} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ComponentProps<"button">;
  return (
    <button type={type} className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
