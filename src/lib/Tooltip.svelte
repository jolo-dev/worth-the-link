<script>
  import Loader from './Loader.svelte'
  import { getPageContent } from './scraper'
  import { useCompletion } from 'ai/svelte';

  export let link = ''
  let promise = getPageContent(link)
  const { completion } = useCompletion({
    // api: '/api/completion',
    api: 'https://api.openai.com/v1/engines/davinci/completions',
  });
  
</script>

<div class="tooltip" data-url={link} style="position: absolute; background:black;color: white;">
  {#await promise}
    <Loader />
  {:then content}
    {content}
  {:catch error}
    Error
    <p style="color: red">{error.message}</p>
  {/await}
  <div id="arrow" />
</div>

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
