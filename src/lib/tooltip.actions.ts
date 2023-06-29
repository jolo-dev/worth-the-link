import { tick } from 'svelte';
import { tooltipStore } from './stores';

export default function createTooltipAction( link: HTMLAnchorElement ) {
  let tooltip = document.querySelector<HTMLElement>(
    `[data-url="${link.href}"]`
  );

  async function onMouseEnter() {

    if ( tooltip === null ) {
      tooltipStore.update( l => {
        return [link.href, ...l];
      } );
      await tick();
      tooltip = document.querySelector<HTMLElement>( `[data-url="${link.href}"]` );
    }
  }

  function onMouseMove( event: MouseEvent ) {

    if ( tooltip ) {
      console.log( 'onMouseMove' );
      tooltip.style.display = 'inline-block';
      tooltip.style.top = `${event.pageY - 225}px`;
      tooltip.style.left = `${event.pageX - 10}px`;
    }
  }

  function onMouseLeave() {
    if ( tooltip ) {
      console.log( 'onMouseLeave' );
      tooltip.style.display = 'none';
    }
  }

  link.addEventListener( 'mouseenter', onMouseEnter );
  link.addEventListener( 'mousemove', onMouseMove );
  link.addEventListener( 'mouseout', onMouseLeave );

  return {
    destroy() {
      link.removeEventListener( 'mouseenter', onMouseEnter );
      link.removeEventListener( 'mousemove', onMouseMove );
      link.removeEventListener( 'mouseout', onMouseLeave );
    },
  };

}