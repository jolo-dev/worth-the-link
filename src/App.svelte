<script lang="ts">
  import { onMount } from 'svelte'
  import Tooltip from './lib/Tooltip.svelte'
  import { tooltipStore } from './lib/stores'
  import createTooltipAction from './lib/tooltip.actions'
  import Loader from './lib/Loader.svelte'

  onMount(() => {
    const links = document.querySelectorAll('a')
    if (links) {
      links.forEach((link) => {
        createTooltipAction(link)        
      })
    }
  })

</script>

{#each $tooltipStore as tooltip}
  <Tooltip link={tooltip} />
{/each}