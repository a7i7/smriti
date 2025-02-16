import { wordlist } from "@scure/bip39/wordlists/english";
import * as bip39 from "@scure/bip39";

export const METADATA = [
  { title: "Board Games", length: 10334, key: "boardGames" },
  { title: "Birds", length: 11503, key: "birds" },
  { title: "Paintings", length: 13140, key: "paintings" },
  { title: "Movies", length: 42840, key: "movies" },
  { title: "Cities", length: 44372, key: "cities" },
  { title: "Songs", length: 57623, key: "songs" },
  { title: "People", length: 88146, key: "people" },
  { title: "Books", length: 96608, key: "books" },
  { title: "Recipes", length: 38879, key: "recipes" },
];

export const getEncodedIndexes = (seedphrase: string) => {
  const entropy = bip39.mnemonicToEntropy(seedphrase, wordlist);

  let integerValue: bigint = entropy.reduce(
    (acc, byte) => acc * BigInt(256) + BigInt(byte),
    BigInt(0)
  );
  console.log("encode entropy", entropy);

  console.log("encode integerValue", integerValue);

  const indexes = [];
  for (let i = 0; i < METADATA.length; i++) {
    const index = Number(integerValue % BigInt(METADATA[i].length));
    integerValue = integerValue / BigInt(METADATA[i].length);
    indexes.push(index);
  }
  console.log("encode indexes", indexes);
  return indexes;
};

export const getDecodedSeedPhrase = (indexes: number[]) => {
  console.log("decode indexes", indexes);
  let integerValue: bigint = BigInt(0);
  for (let i = METADATA.length - 1; i >= 0; i--) {
    integerValue =
      integerValue * BigInt(METADATA[i].length) + BigInt(indexes[i]);
  }

  console.log("decode integerValue", integerValue);

  const entropy = [];
  for (let i = 0; i < 16; i++) {
    entropy.unshift(Number(integerValue % BigInt(256)));
    integerValue = integerValue / BigInt(256);
  }

  console.log("decode entropy", entropy);

  const seedPhrase = bip39.entropyToMnemonic(
    Uint8Array.from(entropy),
    wordlist
  );

  console.log("decode seedPhrase", seedPhrase);
  return seedPhrase;
};
