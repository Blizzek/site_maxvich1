import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <section id={id} className={cn("section-padding", className)}>
      {children}
    </section>
  );
};
