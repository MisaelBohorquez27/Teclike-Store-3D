import { DailyOffers } from "@/components/Offers/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BenefitsGrid } from "@/components/Benefits/BenefitsGrid";
import { FollowUs } from "@/components/FollowUs";
import { TopProductSellPage } from "@/components/BestSellerWeek/BSWPage";

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
