from mnemonic import Mnemonic
import json

classes = [
    {"title": "Board Games", "files":["boardGames.json"]},
    {"title": "Birds", "files":["birds.json"]},
    {"title": "Paintings", "files":["paintings.json"]},
    {"title": "Movies", "files":["movies.json"]},
    {"title": "Cities", "files":["cities.json"]},
    {"title": "Songs", "files":["songs.json"]},
    {"title": "People", "files":["people.json"]},
    {"title": "Books", "files":["books.json"]},
    {"title": "Recipes", "files":["recipes_chunk1.json","recipes_chunk2.json","recipes_chunk3.json"]}
]

def loadJsonData(files):
    combined_data = []
    
    for file in files:
        try:
            with open(f"dataset/clean/{file}", 'r') as f:
                data = json.load(f)
                print(file)
                print(len(data))
                combined_data.extend(data)  # Merge dictionaries
        except (json.JSONDecodeError, FileNotFoundError, ValueError) as e:
            print(f"Error processing file {file}: {e}")
    
    return combined_data

def generate_memory_phrase(entropy_integer):
    entropy = entropy_integer
    classesIndex = 0
    res = []
    while entropy!=0:
        # f = open(f"dataset/clean/{classes[classesIndex]['files'][0]}", 'r')
        data = loadJsonData(classes[classesIndex]['files'])
        print(len(data))
        print(classes[classesIndex])
        print(data[entropy%len(data)])
        print(entropy%len(data))
        res.append(entropy%len(data))
        print("~~~~~~~~~~~~~~~\n")
        entropy = entropy//len(data)
        classesIndex += 1
        # f.close()
    print(res)

def generate_entropy_from_memory_phrase(classIndexes):
    entropy = 0

    for i in range(len(classIndexes)):
        # f = open(f"dataset/clean/{classes[len(classIndexes)-i-1]['files'][0]}", 'r')
        data = loadJsonData(classes[len(classIndexes)-i-1]['files'])
        # data = json.load(f)
        entropy = entropy * len(data)
        entropy += classIndexes[i]
        # f.close()
    return entropy
    
# Initialize the BIP-39 library
mnemo = Mnemonic("english")

# Seed phrase
seed_phrase = "scale certain elegant void crane survey wheat mind baby fringe cat turkey"

# Convert seed phrase to entropy
entropy = mnemo.to_entropy(seed_phrase)


entropy_integer = int.from_bytes(entropy, byteorder="big")
print(entropy_integer)
generate_memory_phrase(entropy_integer)

print(generate_entropy_from_memory_phrase([3917, 9799, 727, 13396, 11140, 48344, 5305, 13446, 136][::-1]))

