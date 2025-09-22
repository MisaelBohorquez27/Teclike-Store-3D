import { DailyOffers } from "@/components/Offers/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { TrendingProducts } from "@/components/TrendingProducts/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReview/CustomerReviews";
import { BenefitsGrid } from "@/components/Benefits/BenefitsGrid";
import { FollowUs } from "@/components/FollowUs/FollowUs";
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
