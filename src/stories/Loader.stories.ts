import type { Meta, StoryObj } from '@storybook/svelte';

import Loader from '../lib/Loader.svelte';

const meta = {
  title: 'Loader',
  component: Loader,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: '#000' },
      ],
    },
  },
} satisfies Meta<Loader>;

export default meta;

type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
};