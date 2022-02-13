<script>
  import words from "./words";
  import { createGameStore, states, MAX_GUESSES } from "./game";
  import LetterInput from "./LetterInput.svelte";
  import Guess from "./Guess.svelte";
  import Dialog from "./Dialog.svelte";

  const game = createGameStore(words);

  window.__game__ = game;

  function handleSubmit() {
    game.checkWord();
  }

  function handleLetterUpdate(index, e) {
    game.selectLetterIndex(index, e.detail.value);
  }

  function handlePlayAgain() {
		game.playAgain();
	}
</script>

<header>
  <h1>
    <span class="heart">💖</span>
    Bundle
  </h1>
</header>
<main>
  <div class="guesses">
    {#if !$game.guesses.length}
      <Guess word="      " winner={$game.winner} />
      <p class="emptyGuesses">
        Guess cute silly words that we like to use a lot, like "BUNDLE" 😊
      </p>
      <p class="emptyGuesses">
        You have five guesses to get it right. Good luck!
      </p>
    {/if}
    {#each $game.guesses as word}
      <Guess {word} winner={$game.winner} />
    {/each}
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
      {#each $game.possibleLetters as possibleLetters, index}
        <LetterInput
          {possibleLetters}
          selected={$game.selectedIndices[index]}
          on:update={(e) => handleLetterUpdate(index, e)}
        />
      {/each}
    </div>
    <button class="button submit" disabled={$game.gameState !== states.PLAYING}
      >Submit</button
    >
  </form>
</main>
{#if $game.gameState === states.VICTORY}
  <Dialog>
    <div class="card">
      <h2>🥳 Hooray, you won!</h2>
      <p>I knew you'd get it, you're so smart. Want to try another word?</p>
      <button class="button fullWidth" on:click={handlePlayAgain}
        >Play Again</button
      >
    </div>
  </Dialog>
{/if}
{#if $game.gameState === states.DEFEAT}
  <Dialog>
    <div class="card">
      <h2>😢 Oh no, you lost</h2>
      <p>What a shame. Wanna give it another shot?</p>
      <button class="button fullWidth" on:click={handlePlayAgain}
        >Play Again</button
      >
    </div>
  </Dialog>
{/if}

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-transform: uppercase;
    margin-top: var(--size-2);
    margin-bottom: var(--size-2);
    padding: 0;
    text-align: center;
    font-size: var(--font-size-6);
    z-index: 0;
    position: relative;
    max-inline-size: none;
    color: var(--color-text-1);
  }

  .heart {
    position: absolute;
    font-size: var(--font-size-6);
    transform-origin: center;
    transform: rotate(-10deg) translate(-80%, -15%) scale(1.1);
    z-index: -1;
  }

  header {
    background: var(--gradient-11);
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .inputs {
    display: flex;
    justify-content: stretch;
    width: 100%;
  }

  .guesses {
    flex-grow: 1;
    gap: var(--size-2);
    display: flex;
    flex-direction: column;
    padding: var(--size-2);
  }

  form {
    background: var(--color-background-gradient);
  }

  .button {
    letter-spacing: var(--size-1);
    color: var(--color-text-1);
    background: var(--gradient-11);
    user-select: none;
    border-radius: var(--radius-4);
    border: none;
    font-weight: var(--font-weight-6);
    font-size: var(--font-size-4);
    text-transform: uppercase;
  }

  .submit {
    margin: 0 var(--size-4) var(--size-4);
  }

  .submit,
  .submit:active {
    border: none;
  }

  .fullWidth {
    width: 100%;
  }

  .emptyGuesses {
    text-align: center;
    padding: 0 var(--size-2);
    width: 100%;
    color: var(--color-text-2);
    max-inline-size: 28ch;
    margin: var(--size-4) auto 0;
  }

  .card {
    background-color: var(--color-background);
    box-shadow: var(--shadow-2);
    padding: var(--size-4) var(--size-3);
    margin: var(--size-2);
    width: 100%;
    border-radius: var(--radius-2);
  }

  h2 {
    font-size: var(--font-size-5);
  }

  h2,
  p {
    margin-bottom: var(--size-3);
  }
</style>
