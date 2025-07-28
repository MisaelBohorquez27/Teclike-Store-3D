import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { BestSellers } from "@/components/BestSellers";
import { Footer } from "@/components/Footer";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { WaveDivider } from "@/components/WaveDivider";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <BenefitsGrid />
      <DailyOffers />
      <BestSellers />
      <TrendingProducts />
      <CustomerReviews />
      <Footer />
    </>
  );
}
