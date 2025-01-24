import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../atoms/Input";
import { Slideshow } from "../components/ImagesSlider";

const meta: Meta<typeof Slideshow> = {
  title: "Components/ImagesSlider",
  component: Slideshow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};