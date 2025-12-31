import { LucideIcon } from "lucide-react";
import { DiscountedProduct } from "./products";

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

export interface Comment {
  id: string;
  rating: number;
  quote: string;
  created_at: string;
  user: {
    username: string;
  } | null;
}

export interface TestimonialCardProps {
  comment: Comment;
  isActive: boolean;
}

export interface InstagramCarsoulProps {
  images: {src: string;
    alt: string;
    id: string;
  } []
}
