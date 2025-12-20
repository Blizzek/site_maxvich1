import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-md p-6 border border-gray-100",
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};
