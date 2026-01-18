"use client";

import React from "react";
import { useAuth } from "@/context/authcontext";
import { DailyOffers } from "@/app/home/components/dailyoffers/dailyofferspage";
import { TrendingProducts } from "@/app/home/components/trendingproducts/trendingproducts";
import { CustomerReviews } from "@/app/home/components/customerreview/customerreviews";
import {
  BenefitsGrid,
  BenefitsGridWithHeading,
} from "@/app/home/components/benefits/benefitsgrid";
import { FollowUs } from "@/app/home/components/followus/followus";
import { HeroBanner2 } from "./components/herobanner/herobanner2";
import { InteractiveVideo } from "./components/interactive/interactivevideo";
import { BestSellersWeekPage } from "./components/bestsellerweek/bswpage";


export function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <HeroBanner2 />
      <InteractiveVideo />
      <FollowUs />
      <TrendingProducts />
      <DailyOffers />
      <BestSellersWeekPage />
      <CustomerReviews />
    </>
  );
}
