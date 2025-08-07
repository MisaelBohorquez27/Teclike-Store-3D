import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { BestSellersWeek } from "@/components/BestSellersWeek";
import { Footer } from "@/components/Footer";
import { TrendingProducts } from "@/components/TrendingProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { Subscription } from "@/components/Subscription";
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
      <Footer />
    </>
  );
}
