import * as bestRepo from "../repositories/bestSellerWeek.repository";
import { formatBestSellerProduct } from "../mappers/bestSellerWeek.formatter";

export async function getBestSellerWeekService() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const topProducts = await bestRepo.getTopSellingProductIds(oneWeekAgo);
  if (topProducts.length === 0) return [];

  const productDetails = await bestRepo.getProductDetailsByIds(
    topProducts.map((p: any) => p.productId)
  );

  return topProducts
    .map((tp: any) => {
      const product = productDetails.find((p) => p.id === tp.productId);
      return product ? formatBestSellerProduct(product) : null;
    })
    .filter(Boolean);
}
