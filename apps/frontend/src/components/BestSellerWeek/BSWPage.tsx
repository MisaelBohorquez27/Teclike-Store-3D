"use client";

import { useCart } from "@/hooks/useCart";
import { TopProductSell } from "./BSWGrid";

export function TopProductSellPage() {
    const { addToCart } = useCart();

    // Wrap addToCart to match the expected signature and return type
    const handleAddToCart = async (productId: number, quantity: number) => {
        await addToCart(productId, quantity);
    };

    return (
        <section>
            <TopProductSell onAddToCart={handleAddToCart} />
        </section>
    );
}