<script>
  import { fade, slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  export let word = "";
  export let winner = "";

  const guessLetters = word.split("");
  const winnerLetters = winner.split("");
</script>

<div class="root">
  {#each guessLetters as guessLetter, i}
    <span
      class="letter"
      class:correct={guessLetter === winnerLetters[i]}
      class:incorrect={guessLetter !== winnerLetters[i]}
      in:fade={{ delay: i * 60, duration: 100, easing: cubicInOut }}
    >
      {#if guessLetter.trim()}
        {guessLetter}
      {:else}
        &nbsp;
      {/if}
    </span>
  {/each}
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    width: 100%;
    gap: var(--size-2);
    max-width: var(--max-width);
  }

  .letter {
    flex-basis: 1;
    width: 100%;
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-7);
    line-height: 1.6;
    text-align: center;
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);
  }

  .incorrect {
    background-color: var(--grey-2);
  }

  .correct {
    background-color: var(--pink-7);
  }
</style>
