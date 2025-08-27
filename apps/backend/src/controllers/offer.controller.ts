// controllers/offers.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";

function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function computeDiscount(priceCents: number, type: string, value: number) {
  let discountedCents = priceCents;
  let discountLabel = "";

  if (type === "percentage") {
    discountedCents = Math.max(0, Math.round(priceCents * (100 - value) / 100));
    discountLabel = `-${value}%`;
  } else if (type === "fixed") {
    discountedCents = Math.max(0, priceCents - value);
    discountLabel = `-$${(value / 100).toFixed(0)}`;
  }

  return { discountedCents, discountLabel };
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 📌 GET /api/offers/featured
export const getFeaturedOffers = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1; // 1–12
    const day = now.getDate();

    // 1) Buscar ofertas activas
    let offers = await prisma.offer.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: {
        offerProducts: { include: { product: true } },
      },
    });

    // 2) Filtro por temporada
    if (month === 11 && day >= 25 && day <= 30) {
      // Black Friday
      offers = offers.filter((o) => o.name.includes("Black Friday"));
    } else if (month === 12 && day >= 15 && day <= 25) {
      // Christmas
      offers = offers.filter((o) => o.name.includes("Christmas"));
    } else if ((month === 12 && day >= 26) || (month === 1 && day <= 15)) {
      // New Year
      offers = offers.filter((o) => o.name.includes("New Year"));
    }

    // 3) Si no hay ofertas activas de temporada → usar todas las activas
    if (offers.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      });

      const fallbackItems = fallbackProducts.map((p) => ({
        id: p.id,
        title: p.name,
        name: p.brand,
        rating: 0,
        image: p.imageUrl ?? "/products/default.png",
        discount: "-10%",
        price: formatCurrency(Math.round(p.priceCents * 0.9), p.currency),
      }));

      return res.json(fallbackItems);
    }

    // 4) Tomar productos de las ofertas filtradas
    const pairs = offers.flatMap((offer) =>
      offer.offerProducts.map((op) => ({ offer, product: op.product }))
    );

    const selected = shuffle(pairs).slice(0, 6);

    const items = selected.map(({ offer, product }) => {
      const { discountedCents, discountLabel } = computeDiscount(
        product.priceCents,
        offer.type,
        offer.value
      );

      return {
        id: product.id,
        title: product.name,
        name: product.brand,
        rating: 0,
        image: product.imageUrl ?? "/products/default.png",
        discount: discountLabel,
        price: formatCurrency(discountedCents, product.currency),
      };
    });

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching seasonal offers:", err);
    res.status(500).json({ message: "Error al obtener ofertas destacadas" });
  }
};
