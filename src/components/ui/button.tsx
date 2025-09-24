import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default:     "btn-primary",
      secondary:   "btn-secondary",
      outline:     "btn-outline",
      ghost:       "btn-ghost",
      link:        "btn-link",
      destructive: "btn-destructive",
    },
    size: {
      default: "btn-md",
      sm:      "btn-sm",
      lg:      "btn-lg",
      icon:    "size-9", // keep this special case if you use icon-only buttons
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
