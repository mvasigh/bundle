<script>
  import { fade } from "svelte/transition";
</script>

<div class="root" in:fade={{ duration: 100 }}>
  <slot />
</div>

<style>
  .root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: stretch;
    align-items: center;
  }
</style>
