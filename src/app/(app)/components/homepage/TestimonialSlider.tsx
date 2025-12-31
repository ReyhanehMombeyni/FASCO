"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./TestimonialCard";
import { Comment } from "@/src/types/homepage";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialSlider = ({comments}: {comments: Comment[]}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % comments.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const leftIndex = (index - 1 + comments.length) % comments.length;
  const rightIndex = (index + 1) % comments.length;

  const displayComments = [
    { ...comments[leftIndex], position: "left" },
    { ...comments[index], position: "center" },
    { ...comments[rightIndex], position: "right" },
  ];

  return (
      <div className="max-w-lg mx-auto">
        <div className="relative h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {displayComments.map((comment) => (
              <motion.div
                key={`${comment.id}-${comment.position}`}
                custom={direction}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: comment.position === "center" ? 1 : 0.4,
                  scale: comment.position === "center" ? 1 : 0.8,
                  x: comment.position === "center" ? 0 : comment.position === "left" ? "-100%" : "100%",
                  zIndex: comment.position === "center" ? 10 : 5,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full max-w-sm"
              >
                <TestimonialCard comment={comment} isActive={comment.position === "center"} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <button onClick={prevStep} className="p-1 lg:p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-white transition-all shadow-md group">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <button onClick={nextStep} className="p-1 lg:p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-white transition-all shadow-md group">
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
  );
};
