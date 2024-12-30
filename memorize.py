from mnemonic import Mnemonic
import json


classes = [
    "boardGames",
    "birds",
    "paintings",
    "movies",
    "cities",
    "songs",
    "people",
    "books",
    "recipes"
]

def generate_memory_phrase(entropy_integer):
    entropy = entropy_integer
    classesIndex = 0
    res = []
    while entropy!=0:
        f = open(f"dataset/clean/{classes[classesIndex]}.json", 'r')
        data = json.load(f)
        print(classes[classesIndex])
        print(data[entropy%len(data)])
        print(entropy%len(data))
        res.append(entropy%len(data))
        print("~~~~~~~~~~~~~~~\n")
        entropy = entropy//len(data)
        classesIndex += 1
        f.close()
    print(res)

def generate_entropy_from_memory_phrase(classIndexes):
    entropy = 0

    for i in range(len(classIndexes)):
        f = open(f"dataset/clean/{classes[len(classIndexes)-i-1]}.json", 'r')
        data = json.load(f)
        entropy = entropy * len(data)
        entropy += classIndexes[i]
        f.close()
    return entropy
    
# Initialize the BIP-39 library
mnemo = Mnemonic("english")

# Seed phrase
seed_phrase = "scale certain elegant void crane survey wheat mind baby fringe cat turkey"

# Convert seed phrase to entropy
entropy = mnemo.to_entropy(seed_phrase)


entropy_integer = int.from_bytes(entropy, byteorder="big")
print(entropy_integer)
# generate_memory_phrase(entropy_integer)

print(generate_entropy_from_memory_phrase([3917, 9799, 727, 13396, 11140, 48344, 5305, 13446, 136][::-1]))
# print(f"Entropy Hex NEW: {hex(entropy_integer)}")

# Print the entropy in hexadecimal format
# print(f"Entropy Hex OGO: 0x{entropy.hex()}")
# print(len(entropy.hex()))

