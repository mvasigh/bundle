import { writable } from "svelte/store";

/**
 * @typedef {Object} GameState
 * @property {string} gameState
 * @property {string[][]} possibleLetters
 * @property {number[]} selectedIndices
 * @property {string[]} words
 * @property {string[]} guesses
 * @property {string} winner
 */

export const MAX_GUESSES = 5;
export const LETTER_COUNT = 6;
export const states = {
  VICTORY: "victory",
  PLAYING: "playing",
  DEFEAT: "defeat",
};

export const random = (list) => list[Math.floor(Math.random() * list.length)];
export const range = (start, end) =>
  Array.from({ length: end - start }, (_, i) => start + i);

/**
 * @param {string[]} words
 * @returns {string[][]}
 */
function getPossibleLetters(words) {
  const letters = range(0, 6).map(() => new Set());

  words.forEach((word) =>
    word.split("").forEach((letter, i) => letters[i].add(letter))
  );

  return letters.map((set) =>
    Array.from(set.values()).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
  );
}

/**
 * @returns {number[]}
 */
function getSelectionIndices(letters) {
  if (!letters) {
    return Array.from({ length: LETTER_COUNT }, () => 0);
  }

  const word = "BUNDLE";

  return Array.from({ length: LETTER_COUNT }, (el, i) => {
    return letters[i].indexOf(word[i]);
  });
}

/**
 * @param {string[]} words
 * @returns {GameState}
 */
function createInitialState(words) {
  return {
    words,
    guesses: [],
    winner: random(words),
    gameState: states.PLAYING,
    possibleLetters: getPossibleLetters(words),
    selectedIndices: getSelectionIndices(getPossibleLetters(words)),
  };
}

/**
 * @param {GameState} state
 */
function checkWord(state) {
  const word = state.selectedIndices
    .map((selection, i) => state.possibleLetters[i][selection])
    .join("");

  if (!state.words.includes(word)) {
    console.log("Does not include word: ", word);
    throw new Error("Invalid word!");
  }

  state.guesses.push(word);

  if (word === state.winner) {
    state.gameState = states.VICTORY;
  } else if (state.guesses.length === MAX_GUESSES) {
    state.gameState = states.DEFEAT;
  }

  return state;
}

/**
 *
 * @param {import('svelte/store').Writable} store
 * @param {Function} fn
 */
function action(store, fn) {
  return (...args) => {
    store.update((state) => fn(state, ...args));
  };
}

/**
 * @param {GameState} state
 * @param {number} letter
 * @param {number} newIndex
 */
function selectLetterIndex(state, letter, newIndex) {
  state.selectedIndices[letter] = newIndex;

  return state;
}

/**
 * @param {GameState} state
 */
function playAgain(prevState) {
  return createInitialState(
    prevState.words.filter((w) => w !== prevState.winner)
  );
}

/**
 * @param {string[]} words
 */
export function createGameStore(words) {
  const initialState = createInitialState(words);
  const store = writable(initialState);
  const { subscribe, set, update } = store;

  console.log("the winner is: ", initialState.winner);

  return {
    subscribe,
    checkWord: action(store, checkWord),
    selectLetterIndex: action(store, selectLetterIndex),
    playAgain: action(store, playAgain),
  };
}
