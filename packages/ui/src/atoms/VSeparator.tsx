import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentPropsWithRef, forwardRef } from "react";

const separatorStyle = cva(["w-[1px]", "h-[50px]", "bg-[#c4c4c4]", "dark:bg-dark", "mr-5"]);
export type VSeparatorProps = ComponentPropsWithRef<"div"> & VariantProps<typeof separatorStyle>;

export const VSeparator = forwardRef<HTMLDivElement, VSeparatorProps>(({ className, ...props }, ref) => {
  return <div
    ref={ref}
    className={cn(separatorStyle({ className }))}
    {...props} />;
});



