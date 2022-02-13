<script>
  import { createEventDispatcher } from "svelte";
  import { spring } from "svelte/motion";

  const dispatch = createEventDispatcher();

  export let selected = 0;
  export let possibleLetters = [];

  const getPct = (v, max) => -100 * (v / max);
  const offset = spring(getPct(selected, possibleLetters.length));

  function handleIncrease() {
    const value = Math.min(possibleLetters.length - 1, selected + 1);
    dispatch("update", { value });

    offset.set(getPct(value, possibleLetters.length));
  }

  function handleDecrease() {
    const value = Math.max(0, selected - 1);
    dispatch("update", { value });
    offset.set(getPct(value, possibleLetters.length));
  }

  let disableIncrease = selected === possibleLetters.length - 1;
  let disableDecrease = selected === 0;
  $: {
    disableIncrease = selected === possibleLetters.length - 1;
    disableDecrease = selected === 0;
  }
</script>

{#if !possibleLetters.length}
  <span>No possible letters</span>
{:else}
  <div class="root">
    <button type="button" disabled={disableDecrease} on:click={handleDecrease}>
      Up
    </button>
    <div class="display">
      <div class="window" style="transform: translateY({$offset}%)">
        {#each possibleLetters as letter, i}
          <div class="letter" class:selected={i === selected}>{letter}</div>
        {/each}
      </div>
    </div>
    <button type="button" disabled={disableIncrease} on:click={handleIncrease}>
      Down
    </button>
  </div>
{/if}

<style>
  .root {
    display: flex;
    flex-direction: column;
    flex-basis: 1;
    width: 100%;
  }

  .display {
    height: var(--size-8);
    overflow: hidden;
  }

  .letter {
    font-size: var(--font-size-4);
    transition: all 200ms ease;
    opacity: 0.7;
    color: var(--gray-5);
    text-align: center;
    font-weight: var(--font-weight-6);
  }

  .letter.selected {
    opacity: 1;
  }
</style>
