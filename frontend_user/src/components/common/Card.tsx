import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={hover ? { y: 0 } : undefined}
        whileHover={hover ? { y: -5 } : undefined}
        className={cn(
          'glass-card rounded-2xl p-6',
          hover && 'cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-nature-500/10',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
