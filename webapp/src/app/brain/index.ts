import { wordlist } from "@scure/bip39/wordlists/english";
import * as bip39 from "@scure/bip39";

export const METADATA = [
  { title: "Board Games", length: 10532 },
  { title: "Birds", length: 11533 },
  { title: "Paintings", length: 13422 },
  { title: "Movies", length: 45466 },
  { title: "Cities", length: 47868 },
  { title: "Songs", length: 57650 },
  { title: "People", length: 88937 },
  { title: "Books", length: 103063 },
  { title: "Recipes", length: 2231142 },
];

export const getEncodedIndexes = (seedphrase: string) => {
  const entropy = bip39.mnemonicToEntropy(seedphrase, wordlist);

  let integerValue: bigint = entropy.reduce(
    (acc, byte) => acc * BigInt(256) + BigInt(byte),
    BigInt(0)
  );

  const indexes = [];
  for (let i = 0; i < METADATA.length; i++) {
    const index = Number(integerValue % BigInt(METADATA[i].length));
    integerValue = integerValue / BigInt(METADATA[i].length);
    indexes.push(index);
  }
  return indexes;
};
