"use client";

import { useCart } from "@/hooks/useCart";
import { BestSellersWeekGrid } from "./Components/BSWGrid";

export function BestSellersWeekPage() {
    const { addToCart } = useCart();

    // Wrap addToCart to match the expected signature and return type
    const handleAddToCart = async (productId: number, quantity: number) => {
        await addToCart(productId, quantity);
    };

    return (
        <section>
            <BestSellersWeekGrid onAddToCart={handleAddToCart} />
        </section>
    );
}