"use client";

import { useCart } from "@/hooks/useCart";
import { TopProductSell } from "./BSWGrid";

export function TopProductSellPage() {
    const { addToCart } = useCart();

    return (
        <section>
            <TopProductSell onAddToCart={addToCart} />
        </section>
    );
}