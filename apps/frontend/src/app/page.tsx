import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { TopProductSell } from "@/components/TopProductsSell";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { FollowUs } from "@/components/FollowUs";

export default function Home() {

  return (
    <>
      <HeroBanner />
      <BenefitsGrid />
      <TrendingProducts />
      <DailyOffers />
      <TopProductSell />
      <FollowUs />
      <CustomerReviews />
    </>
  );
}
