"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, rating = 5 }, i) => (
              <div
                key={`${index}-${i}`}
                className="card-luxury p-6 max-w-xs w-full"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-4 h-4 ${
                        starIndex < rating
                          ? "text-gold fill-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{name}</p>
                    <p className="text-gold text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
