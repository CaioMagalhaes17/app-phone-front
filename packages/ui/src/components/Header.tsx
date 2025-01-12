import { ComponentProps } from "react";
import { Logo } from "./Logo";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { Text } from "@/atoms/Text";

const headerStyle = cva([
  "z-40",
]);

type HeaderProps = ComponentProps<"header"> & VariantProps<typeof headerStyle>;

export function Header({ className, children }: HeaderProps) {
  return (
    <>
      <header className={cn(headerStyle({ className }))} >
        <div className="shadow-sm">
          {children}
        </div>
      </header>
    </>
  )
}