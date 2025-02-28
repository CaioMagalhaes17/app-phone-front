import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const textStyles = cva("", {
  variants: {
    textoColor: {
      primary: "text-[#009e3b]"
    },
    emphasis: {
      low: "text-gray-600 font-light",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl"
    },
    weight: {
      thin: "font-thin",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
      extrabold: "font-extrabold"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    italic: {
      true: "italic",
    },
    underline: {
      true: "underline underline-offset-2",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

type TextElementTypes = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type TextProps = ComponentProps<TextElementTypes> & VariantProps<typeof textStyles> & { as: TextElementTypes };

export function Text({
  as,
  align,
  size,
  emphasis,
  italic,
  underline,
  weight,
  className,
  textoColor,
  ref,
  ...props
}: TextProps) {
  const Component = as || "span";

  return (
    <Component
      className={cn(
        textStyles({
          size,
          weight,
          emphasis,
          italic,
          underline,
          align,
          textoColor,
          className,
        })
      )}
      {...props}
    />
  );
}