import type { Meta, StoryObj } from "@storybook/react";
import DefaultLayout  from ".";

const meta: Meta<typeof DefaultLayout> = {
  title: "Examples/Layout de Página",
  component: DefaultLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
