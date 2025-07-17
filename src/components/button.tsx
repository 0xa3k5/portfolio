"use client";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import Link from "next/link";

interface BaseProps {
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  onClick?: () => void;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  href?: never;
}

interface LinkProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "type" | "onClick"> {
  href: string;
}

type Props = ButtonProps | LinkProps;

export default function Button({
  children,
  className,
  variant,
  href,
  onClick,
  ...props
}: Props) {
  const commonProps = {
    className: cx(
      `
        group/button relative items-center justify-center gap-3 flex rounded-xl px-5 py-4 duration-150 transition-all
        min-h-10 min-w-10
        active:scale-95
        data-[variant=primary]:bg-foam/10 
        data-[variant=primary]:hover:bg-foam
        data-[variant=primary]:text-foam
        data-[variant=primary]:hover:text-midnight
        data-[variant=secondary]:bg-transparent
        data-[variant=secondary]:hover:bg-foam/10
        `,
      className
    ),
  };

  if (href) {
    return (
      <Link
        href={href}
        data-variant={variant}
        onClick={onClick}
        {...commonProps}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        role="button"
        tabIndex={0}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-variant={variant}
      onClick={onClick}
      {...commonProps}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
