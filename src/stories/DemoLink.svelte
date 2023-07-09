<script lang="ts">
import { onMount } from 'svelte'
import createTooltipAction from '../lib/tooltip.actions'
import { tooltipStore } from '../lib/stores'
import Tooltip from '../lib/Tooltip.svelte';
import { useCompletion } from 'ai/svelte';
import { blog } from './blog'

const { completion, complete } = useCompletion({
    api: 'http://localhost:8787/ai',
  });
  
onMount(() => {
    const links = document.querySelectorAll('a')
    if (links) {
        links.forEach((link) => {
            createTooltipAction(link)        
        })
    }
    complete(blog)
})

let data = null

async function fetchData() {
    const response = await fetch('https://medium.com/@jolodev/effectively-using-cdk-pipelines-to-deploy-cdk-stacks-into-multiple-accounts-35f501a58d87');
    const json = await response.json();
    data = json;
    console.log(data);
    
  }
</script>

<div class="links">
    <h1><a href='https://medium.com/@jolodev/effectively-using-cdk-pipelines-to-deploy-cdk-stacks-into-multiple-accounts-35f501a58d87'>Effectively Using CDK Pipelines to deploy CDK stacks into multiple accounts</a></h1>
    <button on:click={fetchData}>Fetch Data</button>
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