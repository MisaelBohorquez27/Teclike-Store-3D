import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { FollowUs } from "@/components/FollowUs";
import { TopProductSellPage } from "@/components/TopProductsSellPage";

export default function Home() {

  return (
    <>
      <HeroBanner />
      <BenefitsGrid />
      <TrendingProducts />
      <DailyOffers />
      <TopProductSellPage/>
      <FollowUs />
      <CustomerReviews />
    </>
  );
}
