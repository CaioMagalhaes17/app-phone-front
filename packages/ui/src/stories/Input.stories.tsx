import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../atoms/Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Insert text here",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Number",
  },
};

export const Date: Story = {
  args: {
    type: "date",
    placeholder: "Date",
  },
};
