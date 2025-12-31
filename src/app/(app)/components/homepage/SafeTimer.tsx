"use client";
import dynamic from 'next/dynamic';
import { TimerSkeleton } from '../skeleton';
import { TimerProps } from "@/src/types/homepage";

const DynamicTimer = dynamic(() => import('./Timer').then(mod => mod.Timer), { 
  ssr: false,
  loading: () => <TimerSkeleton type="DealsOfTheMonth" />
});

export function SafeTimer(props: TimerProps) {
  return <DynamicTimer {...props} />;
}