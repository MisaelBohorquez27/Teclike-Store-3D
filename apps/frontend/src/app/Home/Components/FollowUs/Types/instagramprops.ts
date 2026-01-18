//Tipos para InstagramGallery.tsx e InstagramPost.tsx
import { InstagramPost as InstagramPostType } from "@/types/followUs";

export interface InstagramPostProps {
  post: {
    id: number;
    url: string;
    alt: string;
  };
  instagramUrl: string;
}

export interface InstagramButtonProps {
  instagramUrl: string;
  username: string;
}

export interface InstagramGalleryProps {
  posts: InstagramPostType[];
  instagramUrl: string;
}