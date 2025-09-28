import { DailyOffers } from "@/app/Home/Components/DailyOffers/DailyOffersPage";
import { HeroBanner } from "@/app/Home/Components/HeroBanner/HeroBanner";
import { TrendingProducts } from "@/app/Home/Components/TrendingProducts/TrendingProducts";
import { CustomerReviews } from "@/app/Home/Components/CustomerReview/CustomerReviews";
import { BenefitsGrid } from "@/app/Home/Components/Benefits/BenefitsGrid";
import { FollowUs } from "@/app/Home/Components/FollowUs/FollowUs";
import { BestSellersWeekPage } from "@/app/Home/Components/BestSellerWeek/BSWPage";

export function HomePage() {

  return (
    <>
      <HeroBanner />
      <BenefitsGrid />
      <TrendingProducts />
      <DailyOffers />
      <BestSellersWeekPage />
      <FollowUs />
      <CustomerReviews />
    </>
  );
}
