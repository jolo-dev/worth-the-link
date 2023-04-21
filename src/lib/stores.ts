import { writable } from 'svelte/store';

export const tooltipStore = writable<string[]>([]);
