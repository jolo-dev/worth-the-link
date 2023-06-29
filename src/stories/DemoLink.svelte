<script lang="ts">
import { onMount } from 'svelte'
import createTooltipAction from '../lib/tooltip.actions'
import { tooltipStore } from '../lib/stores'
import Tooltip from '../lib/Tooltip.svelte';

onMount(() => {
    const links = document.querySelectorAll('a')
    if (links) {
        links.forEach((link) => {
            createTooltipAction(link)        
        })
    }
})
</script>

<div class="links">
    <h1><a href='https://medium.com/@jolodev/effectively-using-cdk-pipelines-to-deploy-cdk-stacks-into-multiple-accounts-35f501a58d87'>Effectively Using CDK Pipelines to deploy CDK stacks into multiple accounts</a></h1>
</div>

{#each $tooltipStore as tooltip}
  <Tooltip link={tooltip} />
{/each}

<style>
    .links{
        height: 100vh;
        display: flex;
        place-items: center;
    }
</style>