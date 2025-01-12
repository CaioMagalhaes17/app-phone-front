import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../atoms/Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    className: "btn-primary"
  },
};

export const PrimaryDark: Story = {
  args: {
    children: "Button",
    className: "btn-primary-dark"
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    className: "btn-outline-primary"
  },
};

export const OutlineDark: Story = {
  args: {
    children: "Button",
    className: "btn-outline-primary-dark"
  },
};