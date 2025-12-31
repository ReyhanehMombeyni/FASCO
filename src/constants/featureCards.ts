import { Check, Headset, LucideIcon, Shield, Truck } from "lucide-react";

export interface FeatureCardDetails {
    id: number;
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

export const featureCards: FeatureCardDetails[] = [{
    id: 0,
    icon: Check,
    title: "High Quality",
    subtitle: "crafted from top materials"
}, {
    id: 1,
    icon: Shield,
    title: "Warranty Protection",
    subtitle: "Over 2 years"
}, {
    id: 2,
    icon: Truck,
    title: "Free Shipping",
    subtitle: "order over 150$"
}, {
    id: 3,
    icon: Headset,
    title: "24/7 Support",
    subtitle: "Dedicated support"
}]