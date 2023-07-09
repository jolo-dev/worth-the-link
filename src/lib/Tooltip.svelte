<script>
  import { onMount } from 'svelte'
  import Loader from './Loader.svelte'
  import { getPageContent } from './scraper'
  import { useCompletion } from 'ai/svelte';

export let link = ''
let promise
onMount(async () => {
  try {
    promise = getPageContent(link)
  } catch (error) {
    console.error(error);
  }
})

</script>

{#await promise}
  <p>...waiting</p>
{:then content} 
  <div class="tooltip" data-url={link} contenteditable="inherit" style="position: absolute; background:black;color: white;">
    {content}
    <div id="arrow" />
  </div>
{/await}


<style>
  .tooltip {
    position: absolute;
    background: #222;
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: none;
    z-index: 1;
  }
  #arrow {
    position: absolute;
    background: #222;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    z-index: -1;
  }
</style>
