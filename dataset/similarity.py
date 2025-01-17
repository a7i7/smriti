import json

stop_words = {"the", "is", "in", "at", "of", "on", "a", "an", "and", "to", "with"}

def isSimilar(string1, string2):
    """
    Finds common words between two strings.
    
    Args:
        string1 (str): The first string.
        string2 (str): The second string.
    
    Returns:
        set: A set of common words between the two strings.
    """
    # Split strings into sets of words and find the intersection

    # print(string1)
    # print(string2)
    # print("^^^^^^^^")
    words1 = set(word.lower() for word in string1.split() if word.lower() not in stop_words)
    words2 = set(word.lower() for word in string2.split() if word.lower() not in stop_words)
    common_words = words1 & words2
    # print(common_words)
    # print(words1)
    # print(words2)

    if(len(words1) == len(common_words) and len(words2) == len(common_words)):
        return True
    return False


def loadJsonData(files):
    combined_data = []
    
    for file in files:
        try:
            with open(f"clean/{file}", 'r') as f:
                data = json.load(f)
                print(file)
                print(len(data))
                combined_data.extend(data)  # Merge dictionaries
        except (json.JSONDecodeError, FileNotFoundError, ValueError) as e:
            print(f"Error processing file {file}: {e}")
    
    return combined_data

def dumpJsonData(data, filenames):

    num_chunks = len(filenames)
    chunk_size = max(1, len(data) // num_chunks)
    
    # Split the data into chunks
    for i in range(num_chunks):
        start = i * chunk_size
        end = None if i == num_chunks - 1 else (i + 1) * chunk_size
        chunk = data[start:end]
        
        # Write each chunk to a new file
        output_filename = "clean2/"+filenames[i]
        with open(output_filename, 'w') as outfile:
            json.dump(chunk, outfile, indent=4)
            outfile.close()
        print(f"Chunk {i + 1} saved to {output_filename}")


classes = [
    {"title": "Board Games", "files":["boardGames.json"], "key":"name"},
    {"title": "Birds", "files":["birds.json"], "key":None},
    {"title": "Paintings", "files":["paintings.json"], "key":"name"},
    {"title": "Movies", "files":["movies.json"], "key":None},
    {"title": "Cities", "files":["cities.json"], "key":"name"},
    {"title": "Songs", "files":["songs.json"], "key":"Song"},
    {"title": "People", "files":["people.json"], "key":"name"},
    {"title": "Books", "files":["books.json"], "key":"Title"},
    {"title": "Recipes", "files":["recipes.json"], "key":"title"}
]

INDEX = 8

title = classes[INDEX]['title']
key = classes[INDEX]['key']
files = classes[INDEX]['files']

loadedJson = loadJsonData(files)

count = 0
similar_indexes = set()
for i in range(0,len(loadedJson)):
    if i%100 == 0:
        print(str(i)+" of "+str(len(loadedJson)))
    for j in range(i+1,len(loadedJson)):
        is_similar = isSimilar(loadedJson[i][key] if key!=None else loadedJson[i], loadedJson[j][key] if key!=None else loadedJson[j])
        if is_similar:
            similar_indexes.add(j)
            print(loadedJson[i])
            print(loadedJson[j])
            print("~~~~~~~~~")
            count = count + 1
            print(str(count)+" :: "+str(i)+" of "+str(len(loadedJson)))

cleaned = []
for i  in range(0,len(loadedJson)):
    if i not in similar_indexes:
        cleaned.append(loadedJson[i])

print(len(cleaned))
dumpJsonData(cleaned, files)
