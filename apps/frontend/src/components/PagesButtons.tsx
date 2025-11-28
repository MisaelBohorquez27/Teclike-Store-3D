"use client";
import { cn } from "@/lib/utils";
import { FC, ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: "primary" | "secondary" | "addCart" | "outline" | "submit" | "dark";
  size?: "2xs" | "xs" | "s" | "m" | "xl" | "2xl";
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "m",
  fullWidth = false,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer",
        // Variants
        variant === "primary" && "btn-primary border border-transparent",
        variant === "secondary" && "btn-secondary border border-transparent",
        variant === "addCart" && "btn-addCart border border-transparent",
        variant === "outline" && [
          "bg-transparent text-[#0F2C59] border border-[#0F2C59]",
          "hover:bg-[#0F2C59] hover:text-[#FAF9F6]",
          "dark:text-[#FAF9F6] dark:border-[#FAF9F6] dark:hover:bg-[#FAF9F6] dark:hover:text-[#0F2C59]"
        ],
        variant === "submit" && "Button-bg TextColor2 border border-transparent",
        // Sizes
        size === "2xs" && "px-2.5 py-1 text-xs",
        size === "xs" && "px-3 py-1.5 text-sm sm:text-base",
        size === "s" && "px-4 py-2 text-sm sm:text-base",
        size === "m" && "px-5 py-2.5 text-base sm:text-lg",
        size === "xl" && "px-6 py-3 text-lg sm:text-xl",
        size === "2xl" && "px-8 py-4 text-xl sm:text-2xl",
        // Full width
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;