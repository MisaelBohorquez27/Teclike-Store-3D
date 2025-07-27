import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  return (
    <Link href="/Cart" className="relative">
      <FiShoppingCart
        size={22}
        className="hover:opacity-80 transition-opacity"
      />
      {/* Indicador de items en carrito */}
      <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0F2C59] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        3
      </span>
    </Link>
  );
}
