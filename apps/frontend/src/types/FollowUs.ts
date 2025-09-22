export interface InstagramPost {
  id: number;
  url: string;
  alt: string;
}

export interface FollowUsProps {
  posts?: InstagramPost[];
  instagramUrl?: string;
  username?: string;
}

export const titleAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.2 }
};

export const hoverAnimation = {
  whileHover: { scale: 1.02 }
};

export const DEFAULT_POSTS: InstagramPost[] = [
  { id: 1, url: "/products/foto1.jpg", alt: "Post 1 de Instagram" },
  { id: 2, url: "/products/foto2.jpg", alt: "Post 2 de Instagram" },
  { id: 3, url: "/products/foto3.jpg", alt: "Post 3 de Instagram" },
  { id: 4, url: "/products/foto4.jpg", alt: "Post 4 de Instagram" },
  { id: 5, url: "/products/foto1.jpg", alt: "Post 5 de Instagram" },
  { id: 6, url: "/products/foto2.jpg", alt: "Post 6 de Instagram" },
];

export const DEFAULT_INSTAGRAM_URL = "https://instagram.com/teclike_ec";
export const DEFAULT_USERNAME = "@teclike_ec";