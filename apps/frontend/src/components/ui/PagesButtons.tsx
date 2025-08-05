"use client";
import { cn } from "@/lib/utils";
import { FC, ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: "primary" | "secondary" | "addCart" | "outline" | "submit";
  size?: "xs" | "2xs" | "s" | "m" | "xl" | "2xl";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "default",
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
      className={cn(
        "rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-[#3778d4] text-[#FAF9F6] hover:bg-[#5ca0ff] border-2 border-transparent",
        variant === "secondary" &&
          "bg-[#3f8efd] text-[#FAF9F6] hover:bg-[#3778d4] border-2 border-transparent",
        variant === "addCart" &&
          "bg-[#3f8efd] text-[#FAF9F6] hover:bg-[#3778d4] border-2 border-transparent",
        variant === "outline" &&
          "bg-transparent text-[#0F2C59] border-2 border-[#0F2C59] hover:bg-[#0F2C59] hover:text-[#FAF9F6]",
        variant === "submit" &&
          "bg-[#3778d4] text-[#FAF9F6] hover:bg-[#5ca0ff] border-2 border-transparent",
        size === "2xs" && "px-2 py-1 text-2xs font-extralight",
        size === "xs" && "px-3 py-2 md:text-xs font-medium",
        size === "s" && "px-4 py-3 md:text-sm font-medium",
        size === "m" && "px-5 py-4 md:text-base font-semibold",
        size === "xl" && "px-5 py-4 md:text-lg font-semibold",
        size === "2xl" && "px-6 py-5 md:text-2xl font-bold",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
