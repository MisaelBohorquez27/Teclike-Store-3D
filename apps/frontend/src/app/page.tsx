import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { BestSellersWeek } from "@/components/BestSellersWeek";
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
      <BestSellersWeek />
      <FollowUs />
      <CustomerReviews />
    </>
  );
}
