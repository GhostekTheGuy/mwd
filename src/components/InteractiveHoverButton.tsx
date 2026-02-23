"use client";

import { ArrowRightIcon } from "lucide-react";

export function InteractiveHoverButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  size?: "sm" | "default";
}) {
  const base =
    "group/btn relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-[11px] font-medium transition-[background-color,border-color,color] duration-500 ease-out";

  const variants = {
    primary:
      "bg-primary text-white border border-primary hover:bg-transparent hover:text-primary",
    outline:
      "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
  };

  const sizes = {
    sm: "h-[38px] px-5 text-[13px] tracking-[-0.2px]",
    default: "h-[50px] px-7 text-[15px] tracking-[-0.3px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="inline-flex items-center transition-transform duration-300 ease-out group-hover/btn:-translate-x-2">
        {children}
      </span>
      <ArrowRightIcon
        aria-hidden
        className="absolute right-3 size-4 translate-x-8 opacity-0 transition-all duration-300 ease-out group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
      />
    </button>
  );
}
