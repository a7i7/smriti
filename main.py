from mnemonic import Mnemonic
import json
import sys

classes = [
    {"title": "Board Games", "files":["boardGames.json"]},
    {"title": "Birds", "files":["birds.json"]},
    {"title": "Paintings", "files":["paintings.json"]},
    {"title": "Movies", "files":["movies.json"]},
    {"title": "Cities", "files":["cities.json"]},
    {"title": "Songs", "files":["songs.json"]},
    {"title": "People", "files":["people.json"]},
    {"title": "Books", "files":["books.json"]},
    {"title": "Recipes", "files":["recipes.json"]}
]

def loadJsonData(files):
    combined_data = []
    
    for file in files:
        try:
            with open(f"dataset/clean/{file}", 'r') as f:
                data = json.load(f)
                combined_data.extend(data)  # Merge dictionaries
        except (json.JSONDecodeError, FileNotFoundError, ValueError) as e:
            print(f"Error processing file {file}: {e}")
    
    return combined_data

def generate_memory_phrase(entropy_integer):
    entropy = entropy_integer
    classesIndex = 0
    res = []
    while entropy!=0:
        data = loadJsonData(classes[classesIndex]['files'])
        print(len(data))
        print(classes[classesIndex])
        print(data[entropy%len(data)])
        print(entropy%len(data))
        res.append(entropy%len(data))
        print("~~~~~~~~~~~~~~~\n")
        entropy = entropy//len(data)
        classesIndex += 1
    print(res)

def generate_entropy_from_memory_phrase(classIndexes):
    entropy = 0

    for i in range(len(classIndexes)):
        data = loadJsonData(classes[len(classIndexes)-i-1]['files'])
        entropy = entropy * len(data)
        entropy += classIndexes[i]
    return entropy

def validateAndCleanSeedphraseArgument(seedPhraseRaw):
    # Split the raw input into words
    words = seedPhraseRaw.split()
    
    # Validate that the seed phrase has exactly 12 words
    if len(words) != 12:
        raise ValueError(f"Invalid seed phrase: Expected 12 words, but got {len(words)}.")
    
    # Join the words with a single space
    cleanedSeedPhrase = " ".join(words)
    
    return cleanedSeedPhrase

def generateMetadata():
    classesIndex = 0
    res = []
    while classesIndex < len(classes):
        data = loadJsonData(classes[classesIndex]['files'])
        print(len(data))
        print(classes[classesIndex])
        dic = dict()
        dic["title"]=classes[classesIndex]["title"]
        dic["length"]=len(data)
        res.append(dic)
        classesIndex += 1
    print(res)

# if len(sys.argv) != 2:
#     print("Usage: python your_script.py 'word1 word2 word3 ... word12'")
#     sys.exit(1)

# seed_phrase_raw = sys.argv[1]

# seed_phrase = validateAndCleanSeedphraseArgument(seed_phrase_raw)

# Initialize the BIP-39 library
mnemo = Mnemonic("english")

# Seed phrase
# seed_phrase = "scale certain elegant void crane survey wheat mind baby fringe cat turkey"
seed_phrase = "embrace east bind reflect ketchup climb rhythm fatigue explain boring oil life"
# Convert seed phrase to entropy
entropy = mnemo.to_entropy(seed_phrase)


entropy_integer = int.from_bytes(entropy, byteorder="big")
print(entropy)
print(entropy_integer)
for byte in entropy:
    print(byte)
generate_memory_phrase(entropy_integer)

# print(generate_entropy_from_memory_phrase([3917, 9799, 727, 13396, 11140, 48344, 5305, 13446, 136][::-1]))


# generateMetadata()