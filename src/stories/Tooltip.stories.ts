import type { Meta, StoryObj } from '@storybook/svelte';

import DemoLink from './DemoLink.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Tooltip',
  component: DemoLink,
} satisfies Meta<DemoLink>;

export default meta;
type Story = StoryObj<typeof DemoLink>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {
  name: 'Tooltip'
};
