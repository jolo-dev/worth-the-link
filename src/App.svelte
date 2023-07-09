<script lang="ts">
  import { onMount } from 'svelte'
  import Tooltip from './lib/Tooltip.svelte'
  import { tooltipStore } from './lib/stores'
  import createTooltipAction from './lib/tooltip.actions'
  
  onMount(() => {
    setTimeout(() => {
      console.log('Mounting Worth-the-link extension');
      
      const links = document.querySelectorAll('a')
      
      if (links) {
        links.forEach((link) => {
          createTooltipAction(link)        
        })
      }
    }, 5000);
  })

</script>

{#each $tooltipStore as tooltip}
  <Tooltip link={tooltip} />
{/each}