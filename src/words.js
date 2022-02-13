const words = [
  "BUBBLE",
  "CUDDLE",
  "POOKIE",
  "GOOGIE",
  "BLORSH",
  "POOKIS",
  "BUNDLE",
  "HUNDLE",
  "BUBLUV",
  "BINGUS",
  "NONEET",
  "GOOGUS",
  "BAYBAW",
  "BLORGH",
  "GLORBY",
  "BONGUS",
  "NONIUS",
  "CUDDLY",
  "BUBBLY",
  "BEEBAW",
  "HONEET",
];

export default [
  ...new Set(words.filter((w) => w.length === 6).map((w) => w.toUpperCase())),
];
