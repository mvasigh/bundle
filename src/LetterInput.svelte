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
  }

  function handleDecrease() {
    const value = Math.max(0, selected - 1);
    dispatch("update", { value });
  }

  let disableIncrease = selected === possibleLetters.length - 1;
  let disableDecrease = selected === 0;
  $: {
    disableIncrease = selected === possibleLetters.length - 1;
    disableDecrease = selected === 0;
    offset.set(getPct(selected, possibleLetters.length));
  }
</script>

{#if !possibleLetters.length}
  <span>No possible letters</span>
{:else}
  <div class="root">
    <button type="button" disabled={disableDecrease} on:click={handleDecrease}>
      ▲
      <span class="hidden">Up</span>
    </button>
    <div class="display">
      <div class="window" style="transform: translateY({$offset}%);">
        {#each possibleLetters as letter, i}
          <div class="letter" class:selected={i === selected}>
            {letter}
          </div>
        {/each}
      </div>
    </div>
    <button type="button" disabled={disableIncrease} on:click={handleIncrease}>
      ▼
      <span class="hidden">Down</span>
    </button>
  </div>
{/if}

<style>
  .root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    z-index: 0;
  }

  .display {
    height: var(--size-8);
  }

  .letter {
    font-size: var(--font-size-6);
    transition: all 200ms ease;
    opacity: 0.3;
    color: var(--gray-7);
    text-align: center;
    font-weight: var(--font-weight-6);
    line-height: 1.3;
    user-select: none;
  }

  .letter.selected {
    opacity: 1;
    background-color: var(--color-background-2);
    color: var(--color-text-2);
  }

  button,
  button:active {
    border: none;
    background: none;
  }

  button {
    z-index: 1;
    transition: all 100ms ease;
    appearance: none;
    margin: 0;
    width: 100%;
    line-height: 1.5;
    font-size: var(--font-size-6);

    color: var(--color-text-1);
  }

  button:disabled {
    color: var(--color-text-2);
    opacity: 0.1;
  }

  .hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
