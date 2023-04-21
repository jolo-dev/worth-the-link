import { tick } from 'svelte';
import { tooltipStore } from './stores';

export default function createTooltipAction(link: HTMLAnchorElement) {
  let tooltip = document.querySelector<HTMLElement>(
    `[data-url="${link.href}"]`
  );

  async function onMouseEnter() {

    if (tooltip === null) {
      tooltipStore.update(l => {
        return [link.href, ...l];
      });
      await tick();
      tooltip = document.querySelector<HTMLElement>(`[data-url="${link.href}"]`);
    }
  }

  function onMouseMove(event: MouseEvent) {

    if (tooltip) {
      tooltip.style.display = 'inline-block';
      tooltip.style.top = `${event.pageY - 40}px`;
      tooltip.style.left = `${event.pageX}px`;
    }
  }

  function onMouseLeave() {

    if (tooltip) {
      tooltip.style.display = '';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  link.addEventListener('mouseenter', onMouseEnter);
  link.addEventListener('mousemove', onMouseMove);
  link.addEventListener('mouseleave', onMouseLeave);

  return {
    destroy() {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      link.removeEventListener('mouseenter', onMouseEnter);
      link.removeEventListener('mousemove', onMouseMove);
      link.removeEventListener('mouseleave', onMouseLeave);
    },
  };

}