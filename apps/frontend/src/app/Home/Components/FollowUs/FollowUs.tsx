"use client";
import { motion } from "framer-motion";
import { InstagramGallery } from "./Components/InstagramGallery/InstagramGallery";
import { InstagramButton } from "./Components/InstagramGallery/InstagramButton";
import { SubscriptionSection } from "./Components/SubscriptionSection/Subscription";
import { 
  FollowUsProps, 
  DEFAULT_POSTS, 
  DEFAULT_INSTAGRAM_URL, 
  DEFAULT_USERNAME, 
  titleAnimation 
} from "@/types/FollowUs";

export function FollowUs({ 
  posts = DEFAULT_POSTS, 
  instagramUrl = DEFAULT_INSTAGRAM_URL, 
  username = DEFAULT_USERNAME 
}: FollowUsProps) {
  return (
    <section className="FollowUs-bg py-14 px-4 flex flex-col lg:flex-row">
      {/* Instagram Section */}
      <div className="bg-transparent w-full lg:w-2/3 lg:px-12">
        <div className="text-center mb-8">
          <motion.h2
            className="TitleColor text-3xl md:text-4xl font-bold mb-6"
            {...titleAnimation}
          >
            Síguenos en Instagram
          </motion.h2>
        </div>

        <InstagramGallery posts={posts} instagramUrl={instagramUrl} />
        <InstagramButton instagramUrl={instagramUrl} username={username} />
      </div>

      {/* Subscription Section */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
        <SubscriptionSection />
      </div>
    </section>
  );
}