<script>
  import Loader from './Loader.svelte'

  export let link = ''
  console.log('Hello from the Tooltip')
</script>

<div class="tooltip" data-url={link}>
  <Loader />
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
  }
  #arrow {
    position: absolute;
    background: #222;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }
</style>
