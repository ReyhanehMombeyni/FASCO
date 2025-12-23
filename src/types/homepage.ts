import { LucideIcon } from "lucide-react";
import { DiscountedProduct } from "./products";

export interface TimeValues {
  Days: number;
  Hr: number;
  Mins: number;
  Sec: number;
}

export interface TimeLeft {
  Days: string;
  Hr: string;
  Mins: string;
  Sec: string;
  isFinished: boolean;
}

export interface TimerBlockProps {
  value: string;
  label: string;
  type: string;
}

export interface TimerProps {
  endDateString: string;
  type: string;
}

export interface DiscountedDetail {
  nameCompain: string;
  discountedProducts: DiscountedProduct[];
}

export interface SearchParamsProp {
  category?: string;
}

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface CommentDisplay {
  id: string;
  rating: number;
  quote: string;
  created_at: string;
  user: {
    username: string;
  } | null;
}

export interface TestimonialCardProps {
  comment: CommentDisplay;
  isActive: boolean;
}

export interface InstagramCarsoulProps {
  images: {src: string;
    alt: string;
    id: string;
  } []
}

// import { LucideIcon } from "lucide-react";

// export interface FeatureCard {
//   icon: LucideIcon;
//   title: string;
//   subtitle: string;
// }

// export interface FeaturedCollection {
//   id: string;
//   title: string;
//   image_url: string;
//   products: Product[];
// }

// export interface Banner {
//   id: string;
//   image_url: string;
//   link_to: string;
//   is_primary: boolean;
// }
