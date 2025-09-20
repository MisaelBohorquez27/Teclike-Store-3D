// controllers/offers.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import { Offer, Product } from "@prisma/client";

// 🔧 Tipo extendido: Offer con productos incluidos
type OfferWithProducts = Offer & {
  offerProducts: { product: Product }[];
};

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
    discountedCents = Math.max(
      0,
      Math.round((priceCents * (100 - value)) / 100)
    );
    discountLabel = `-${value}%`;
  } else if (type === "fixed") {
    discountedCents = Math.max(0, priceCents - value);
    discountLabel = `-${formatCurrency(value, "USD")}`;
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

// 🔧 Ajustar fechas para ofertas recurrentes
function adjustOfferDates(offer: OfferWithProducts): OfferWithProducts {
  const now = new Date();

  if (offer.recurrence === "yearly") {
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);
    const currentYear = now.getFullYear();

    start.setFullYear(currentYear);
    end.setFullYear(currentYear);

    if (end < now) {
      start.setFullYear(currentYear + 1);
      end.setFullYear(currentYear + 1);
    }

    return { ...offer, startDate: start, endDate: end };
  }

  if (offer.recurrence === "daily") {
    const start = new Date(now);
    const end = new Date(now);
    if (end < now) {
      start.setDate(now.getDate() + 1);
      end.setDate(now.getDate() + 1);
    }
    return { ...offer, startDate: start, endDate: end };
  }

  return offer;
}

function isOfferActive(offer: OfferWithProducts): boolean {
  const now = new Date();
  return now >= offer.startDate && now <= offer.endDate;
}

// 📌 GET /api/offers
// Opcional: ?recurrence=daily&limit=6
export const getOffers = async (req: Request, res: Response) => {
  try {
    const recurrence = (req.query.recurrence as string) || null;
    const limit = parseInt(req.query.limit as string) || 6;

    // 1) Traer todas las ofertas o filtrar por recurrencia
    let offers: OfferWithProducts[] = await prisma.offer.findMany({
      where: recurrence ? { recurrence } : {},
      include: { offerProducts: { include: { product: true } } },
    });

    // 2) Ajustar fechas y filtrar activas
    offers = offers.map(adjustOfferDates).filter(isOfferActive);

    // 3) Fallback si no hay ninguna oferta activa
    if (offers.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      return res.json(
        fallbackProducts.map((p) => ({
          id: p.id,
          title: p.name,
          name: p.brand,
          rating: 4.8,
          image: p.imageUrl ?? "/products/default.png",
          discount: "-10%",
          price: formatCurrency(Math.round(p.priceCents * 0.9), p.currency),
        }))
      );
    }

    // 4) Construir lista productos+oferta
    const pairs = offers.flatMap((offer) =>
      offer.offerProducts.map((op) => ({ offer, product: op.product }))
    );

    // 5) Mezclar y limitar
    const selected = shuffle(pairs).slice(0, limit);

    // 6) Formatear
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
        timeLeft: Math.ceil(
          (new Date(offer.endDate).getTime() - Date.now()) / (1000 * 60 * 60)
        ), // horas restantes
      };
    });

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching offers:", err);
    res.status(500).json({ message: "Error al obtener ofertas" });
  }
};
