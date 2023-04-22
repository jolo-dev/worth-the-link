<script>
  import Loader from './Loader.svelte'
  import { getPageContent } from './scraper'

  export let link = ''
  let promise = getPageContent(link)
</script>

<div class="tooltip" data-url={link}>
  {#await promise}
    <Loader />
  {:then content}
    Content
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
