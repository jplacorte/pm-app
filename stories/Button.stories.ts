import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { TextButton } from "@/components/ui/";

const meta = {
  title: "Buttons",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    version: "primary",
    label: "Button",
    size: "regular",
    theme: "light",
  },
};

export const Secondary: Story = {
  args: {
    version: "secondary",
    label: "Button",
    size: "regular",
    theme: "light",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Button",
  },
};
