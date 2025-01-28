import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from ".";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    steps: {
      description: 'Máximo 10'
    }
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const steps = ['Unidades', 'Questionário', 'Confirmação', 'xrc']

export const Default: Story = {
  args: {
    steps,
    activeTab: 1
  }
}