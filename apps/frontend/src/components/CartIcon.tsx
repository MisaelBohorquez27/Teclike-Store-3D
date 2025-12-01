"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/hooks/useCart";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/Cart" className="relative inline-block p-2">
      <div >
        <FiShoppingCart
          size={24}
          className="text-gray-400 hover:text-cyan-600 transition-colors duration-300"
        />
        
        {itemCount > 0 && (
          <span 
            className="
              absolute -top-0.5 -right-1
              bg-gradient-to-r from-cyan-500 to-blue-500 
              text-white text-xs font-bold 
              min-w-[20px] h-5 px-1
              flex items-center justify-center 
              rounded-full shadow-lg
              animate-bounce-once
            "
            key={itemCount} // Esto fuerza re-montar la animación cuando cambia
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}