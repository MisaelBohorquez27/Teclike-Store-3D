import { DailyOffers } from "@/components/DailyOffers";
import { HeroBanner } from "@/components/HeroBanner";
import { BestSellers } from "@/components/BestSellers";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <DailyOffers />
      <BestSellers />
    </>
  );
}
