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
    discountedCents = Math.max(0, Math.round(priceCents * (100 - value) / 100));
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

// 🔧 Ajustar fechas para ofertas anuales
function adjustOfferDates(offer: OfferWithProducts): OfferWithProducts {
  if (offer.recurrence === "yearly") {
    const now = new Date();
    const currentYear = now.getFullYear();
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);

    start.setFullYear(currentYear);
    end.setFullYear(currentYear);

    // Si ya terminó este año → mover al próximo
    if (end < now) {
      start.setFullYear(currentYear + 1);
      end.setFullYear(currentYear + 1);
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
export const getOffers = async (req: Request, res: Response) => {
  try {
    // 1) Traer TODAS las ofertas con sus productos
    let offers: OfferWithProducts[] = await prisma.offer.findMany({
      include: { offerProducts: { include: { product: true } } },
    });

    // 2) Ajustar fechas y filtrar activas
    offers = offers.map(adjustOfferDates).filter(isOfferActive);

    // 3) Separar por recurrencia
    const yearlyOffers = offers.filter((o) => o.recurrence === "yearly");
    const dailyOffers = offers.filter((o) => o.recurrence === "daily");

    let selectedOffers: OfferWithProducts[] = [];

    // 🎄 Priorizar las de temporada si hay activas
    if (yearlyOffers.length > 0) {
      selectedOffers = yearlyOffers;
    } else if (dailyOffers.length > 0) {
      // 🔄 Si no hay de temporada, usar daily
      selectedOffers = dailyOffers;
    }

    // 4) Si no hay NINGUNA → fallback a productos recientes
    if (selectedOffers.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      });

      const fallbackItems = fallbackProducts.map((p) => ({
        id: p.id,
        title: p.name,
        name: p.brand,
        rating: 4.8,
        image: p.imageUrl ?? "/products/default.png",
        discount: "-10%",
        price: formatCurrency(Math.round(p.priceCents * 0.9), p.currency),
      }));

      return res.json(fallbackItems);
    }

    // 5) Construir lista de productos de las ofertas seleccionadas
    const pairs = selectedOffers.flatMap((offer) =>
      offer.offerProducts.map((op) => ({ offer, product: op.product }))
    );

    // Mezclar y tomar hasta 6 productos
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
    console.error("❌ Error fetching featured offers:", err);
    res.status(500).json({ message: "Error al obtener ofertas destacadas" });
  }
};
