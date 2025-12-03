import { DailyOffers } from "@/app/Home/Components/DailyOffers/DailyOffersPage";
import { HeroBanner } from "@/app/Home/Components/HeroBanner/HeroBanner";
import { TrendingProducts } from "@/app/Home/Components/TrendingProducts/TrendingProducts";
import { CustomerReviews } from "@/app/Home/Components/CustomerReview/CustomerReviews";
import { BenefitsGrid, BenefitsGridWithHeading } from "@/app/Home/Components/Benefits/BenefitsGrid";
import { FollowUs } from "@/app/Home/Components/FollowUs/FollowUs";
import { BestSellersWeekPage } from "@/app/Home/Components/BestSellerWeek/BSWPage";
import { HeroBanner2 } from "./Components/HeroBanner/HeroBanner2";

export function HomePage() {

  return (
    <>
      <HeroBanner2 />
      <BenefitsGridWithHeading />
      <TrendingProducts />
      <DailyOffers />
      <BestSellersWeekPage />
      <FollowUs />
      <CustomerReviews />
    </>
  );
}
