import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { BestSellers } from "@/components/BestSellers";
import { Footer } from "@/components/Footer";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <DailyOffers />
      <BestSellers />
      <TrendingProducts />
      <CustomerReviews />
      <Footer />
    </>
  );
}
