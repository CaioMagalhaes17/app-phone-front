import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";

const panelStyle = cva([
  "panel",
])

type PanelProps = ComponentProps<"div"> & VariantProps<typeof panelStyle>;

export function Panel({className, children, ...rest} : PanelProps){
  return (
    <div className={cn(panelStyle({className}))} {...rest}>
      {children}
    </div>
  )
}