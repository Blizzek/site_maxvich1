import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
        ghost: "hover:bg-accent-500/10 text-accent-500",
        link: "text-primary-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, target, rel, children, type = "button", ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <a className={classes} href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    }

    return (
      <button className={classes} ref={ref} type={type} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
