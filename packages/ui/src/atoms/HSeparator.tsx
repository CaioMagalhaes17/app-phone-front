import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentPropsWithRef, forwardRef } from "react";

const separatorStyle = cva(["border-b", "border-b-[#c4c4c4]", "dark:border-b-[#323b45]", "mt-5"]);
export type HSeparatorProps = ComponentPropsWithRef<"div"> & VariantProps<typeof separatorStyle>;

export const HSeparator = forwardRef<HTMLDivElement, HSeparatorProps>(({ className, ...props }, ref) => {
  return <div
    ref={ref}
    className={cn(separatorStyle({ className }))}
    {...props} />;
});



