<script>
  import words from "./words";
  import { createGameStore, states } from "./game";
  import LetterInput from "./LetterInput.svelte";
  import Guess from "./Guess.svelte";

  const game = createGameStore(words);

  window.__game__ = game;

  game.subscribe((s) => console.log("state update:", s));

  function handleSubmit() {
    game.checkWord();
  }

  function handleLetterUpdate(index, e) {
    game.selectLetterIndex(index, e.detail.value);
  }
</script>

<header>
	<h1> 
		<span class="heart">💖</span>
		Bundle
	</h1>
</header>
<main>
  {#if $game.gameState === states.VICTORY}
    <p>You won!</p>
  {/if}
  {#if $game.gameState === states.DEFEAT}
    <p>You LOST!</p>
  {/if}
  <div class="guesses">
		{#if !$game.guesses.length}
			<Guess word="      " winner={$game.winner} />
			<p class="emptyGuesses">
				Guess cute silly words that we like to use a lot, like "BUNDLE" 😊
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
    <button class="submit" disabled={$game.gameState !== states.PLAYING}>Submit</button>
  </form>
</main>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
		background-color: var(--gray-9);
		color: var(--gray-1);
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
		color: var(--gray-1);
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
    gap: var(--size-4);
    display: flex;
    flex-direction: column;
		padding: var(--size-2);
  }

	form {
		background: var(--gradient-8);
	}

	.submit {
		border-radius: var(--radius-4);
		font-weight: var(--font-weight-6);
		font-size: var(--font-size-4);
		text-transform: uppercase;
		margin: 0 var(--size-4) var(--size-4);
		letter-spacing: var(--size-1);
		color: var(--gray-1);
		background: var(--gradient-11);
	}

	.submit, .submit:active {
		border: none;
	}

	.emptyGuesses {
		text-align: center;
		padding: var(--size-4);
		width: 100%;
		color: var(--gray-6);
		max-inline-size: 28ch;
		margin: 0 auto;
	}
</style>
