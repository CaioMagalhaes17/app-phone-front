import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-[1000px] h-[80px]'
  }
}