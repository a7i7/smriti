
import requests
import os
import urllib.request
import shutil
import math
import csv
import json
import math

PEXELSAPI_KEY = '563492ad6f91700001000001252b83e783bf42e9b16e8907d260f883'


classes = [
    {"title": "Board Games", "files":["boardGames.json"], "key":"boardGames"},
    {"title": "Birds", "files":["birds.json"], "key":"birds"},
    {"title": "Paintings", "files":["paintings.json"], "key":"paintings"},
    {"title": "Movies", "files":["movies.json"], "key":"movies"},
	{"title": "Cities", "files":["cities.json"], "key":"cities"},
	{"title": "Songs", "files":["songs.json"], "key":"songs"},
	{"title": "People", "files":["people.json"], "key":"people"},
	{"title": "Books", "files":["books.json"], "key":"books"},
	{"title": "Recipes", "files":["recipes.json"], "key":"recipes"}
]

def loadJsonData():

	x = dict()
	for c in classes:
		print(c)
		combined_data = []
		for file in c["files"]:
			try:
				with open(f"clean2/{file}", 'r') as f:
					data = json.load(f)
					combined_data.extend(data)  # Merge dictionaries
			except (json.JSONDecodeError, FileNotFoundError, ValueError) as e:
				print(f"Error processing file {file}: {e}")
		x[c["key"]] = combined_data
	return x
		
    


def extractMovies():
	file = open('movies_metadata.csv','r')

	csvreader = csv.reader(file)
	for row in csvreader:
		print(row[8])

def calculateEntropyRatio(classes): 
	totalCombinations = 1;
	powerTwosSum = 0
	for key in classes.keys():
		powerOfTwo = math.floor(math.log(len(classes[key]))/math.log(2))
		powerTwosSum+=powerOfTwo
		print(key +' '+str(powerOfTwo))
		totalCombinations*=len(classes[key])
	print(totalCombinations / 2**128)
	print(powerTwosSum)



def downloadImages(className) :
	if(os.path.isdir(className)):
		shutil.rmtree(className)
	os.mkdir(className)

	for item in classes[className]:
		print(item)
		response = requests.get("https://api.pexels.com/v1/search?query="+item, headers={"Authorization":PEXELSAPI_KEY})
		print(response.json())
		original_url = response.json()['photos'][0]['src']['original']
		photo_url = response.json()['photos'][0]['src']['large']
		indexOfDot = original_url.rindex('.')
		extension = original_url[indexOfDot+1:]

		response = requests.get(photo_url)
		file = open(className+"/"+item+"."+extension, "wb")
		file.write(response.content)
		file.close()
		# print(photo_url)
		# urllib.request.urlretrieve( photo_url, '1.jpeg', headers={'User-Agent': 'Mozilla/5.0'})

def addToJson(key, array):
	# File path for the JSON file
	file_path = "allData.json"

	try:
		# Read the existing data from the JSON file
		with open(file_path, "r") as file:
			data = json.load(file)

	except FileNotFoundError:
		# If the file doesn't exist, initialize an empty dictionary
		data = {}

	except json.JSONDecodeError:
		# If the file exists but is not a valid JSON, initialize an empty dictionary
		data = {}

	# Add the new key-value pair to the data
	data[key] = array

	try:
		# Write the updated data back to the file
		with open(file_path, "w") as file:
			json.dump(data, file, indent=4)
		print(f"Successfully added key '{key}' to the file.")

	except Exception as e:
		print(f"An error occurred while writing to the file: {e}")

def removeFromJson(key):
	# File path for the JSON file
	file_path = "allData.json"

	try:
		# Read the existing data from the JSON file
		with open(file_path, "r") as file:
			data = json.load(file)

	except FileNotFoundError:
		# If the file doesn't exist, initialize an empty dictionary
		data = {}

	except json.JSONDecodeError:
		# If the file exists but is not a valid JSON, initialize an empty dictionary
		data = {}

	del data[key]
	try:
		# Write the updated data back to the file
		with open(file_path, "w") as file:
			json.dump(data, file, indent=4)
		print(f"Successfully added key '{key}' to the file.")

	except Exception as e:
		print(f"An error occurred while writing to the file: {e}")

def generateTable(d):
	cum = 0
	print("| Type      | Total Elements (N) | $$\\lfloor \\log_2(N) \\rfloor$$ | Occupied | 128 - $$\\lfloor \\log_2(N) \\rfloor$$ | \n | ---- | ------------------ | ------------------------- | -------------- | ---------- |")
	for x in sorted(d, key = lambda di : len(d[di])):
		numElements = len(d[x])
		numBinClasses = math.floor(math.log(numElements)/math.log(2))
		cum = cum+numBinClasses
		print("|{0}|{1}|{2}|{3} |{4}|".format(x,numElements,numBinClasses,cum,128-cum ))


def readBooks():
	with open("BooksDatasetClean.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			print(row)
			data.append({
				"Title": row.get("Title"),
				"Authors": row.get("Authors"),
				"Description": row.get("Description"),
				"Category": row.get("Category"),
				"Publisher": row.get("Publisher"),
				"Price Starting With ($)": row.get("Price Starting With ($)"),
				"Publish Date": {
					"Month": row.get("Publish Date (Month)"),
					"Year": row.get("Publish Date (Year)")
				}
			})
		return data

def readSongs():
	with open("spotify_millsongdata.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			data.append({
				"Artist": row.get("artist"),
				"Song": row.get("song"),
			})
		return data

def readRecipes():
	f = open('raw/recipes_raw_nosource_ar.json','r')
	d = json.load(f)
	data = []
	for x in d:
		data.append(d[x])
	return data

def readBirds():
	with open("birdsioc.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			# print(row)
			if(row.get("English name")):
				print(row.get("English name"))
				data.append(row.get("English name"))
	return data

def readPeople():
	with open("people.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			people = {
				"name" : row.get("name"),
				"occupation":row.get("occupation"),
				"gender":row.get("gender"),
				"birthYear":row.get("birthyear"),
				"birthPlaceName":row.get("bplace_name"),
				"birthPlaceCountry":row.get("bplace_country"),
				"deathYear":row.get("deathyear"),
				"deathPlaceName":row.get("dplace_name"),
				"deathPlaceCountry":row.get("dplace_country")
			}
			data.append(people)
	return data

def readBoardGames():
	with open("board_games.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			boardGame = {
				"name":row.get("name"),
				"description" : row.get("description"),
				"artist":row.get("artist"),
			}
			# print(boardGame)
			data.append(boardGame)
	return data

def readCities():
	with open("worldcities.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			city = {
				"name":row.get("city"),
				"lat" : row.get("lat"),
				"lng":row.get("lng"),
				"country":row.get("country")
			}
			data.append(city)
	return data

def readPaintings():
	artists = dict()
	with open("artist.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		for row in csv_reader:
			artists[row.get("artist_id")] = {
				"name":row.get("full_name"),
				"nationality" : row.get("nationality"),
				"style":row.get("style"),
				"birth":row.get("birth"),
				"death":row.get("death")
			}
	print("Read artists")
	image_links = dict()
	with open("image_link.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		for row in csv_reader:
			image_links[row.get("work_id")] = {
				"small_url":row.get("thumbnail_small_url"),
				"large_url" : row.get("thumbnail_large_url"),
			}
	print("Read image links")
	paintings = []
	with open("work.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		names = set()
		for row in csv_reader:
			if not row.get("name") in names:
				paintings.append({
					"work_id":row.get("work_id"),
					"name":row.get("name"),
					"style":row.get("style"),
					"artist":artists[row.get("artist_id")],
				})
				names.add(row.get("name"))
				print(paintings[len(paintings)-1])
	
	return paintings
		
		# for i in range(1,len(paintings)):
		# 	if(paintings[i]['name']==paintings[i-1]['name']):
		# 		print(paintings[i])
		# 		print(paintings[i-1])
		# 		print("~~~~~~~~~~~~~")

def splitAllData():
	f = open('allData.json','r')
	d = json.load(f)
	for x in d:
		print(x)
		file_path = x+".json"
		try:
			# Write the updated data back to the file
			with open(file_path, "w") as file:
				json.dump(d[x], file, indent=4)
			print(f"Successfully added key '{x}' to the file.")

		except Exception as e:
			print(f"An error occurred while writing to the file: {e}")

def split_json_file(filename, num_chunks):
    """
    Splits a JSON file containing an array of objects into multiple smaller JSON files.

    :param filename: Path to the input JSON file.
    :param num_chunks: Number of chunks to split the JSON array into.
    """
    # Read the JSON file
    with open(filename, 'r') as file:
        data = json.load(file)
    
    # Ensure the data is a list
    if not isinstance(data, list):
        raise ValueError("The JSON file must contain an array of objects.")
    
    # Calculate chunk size
    chunk_size = max(1, len(data) // num_chunks)
    
    # Split the data into chunks
    for i in range(num_chunks):
        start = i * chunk_size
        end = None if i == num_chunks - 1 else (i + 1) * chunk_size
        chunk = data[start:end]
        
        # Write each chunk to a new file
        output_filename = f"{os.path.splitext(filename)[0]}_chunk{i + 1}.json"
        with open(output_filename, 'w') as outfile:
            json.dump(chunk, outfile, indent=4)
        print(f"Chunk {i + 1} saved to {output_filename}")


def splitIntoChunks():
	for c in classes:
		print(c)
		for file in c["files"]:
			key = file[:-5]
			dirname = "clean/"+key
			if not os.path.exists(dirname):
				os.makedirs(dirname)
			with open("clean/"+file, 'r') as file:
				data = json.load(file)
				for i in range(0, len(data), 100):
					startIndex = i
					endIndex = min(i+100, len(data))
					chunk = data[startIndex:endIndex]
					newfilename = dirname+"/"+key+"_"+str(startIndex)+"_"+str(endIndex)+".json"
					print(newfilename)
					with open(newfilename, 'w') as outfile:
						json.dump(chunk, outfile, indent=4)
						outfile.close()
					print(f"Chunk {i + 1} saved to {dirname}/{str(i)}.json")
				print(len(data))
# recipes = readRecipes()

# with open("clean2/recipes.json", "w") as file:
# 	json.dump(recipes, file, indent=4)

# for x in recipes:
# 	print(x)
# 	time
# data = loadJsonData()
# print(len(data))
# generateTable(data)
splitIntoChunks()

# split_json_file("clean/recipes.json",3)


# splitAllData()

# paintings = readPaintings()
# birds = readBirds()

# songs = readSongs()
# recipes = readRecipes()
# people = readPeople()
# boardGames = readBoardGames()
# cities = readCities()
# print("Read all recipes")
# for r in recipes:
# 	print(r)
# print(recipes)
# addToJson("paintings",paintings)
# removeFromJson("countries")

# generateTable()
# books = readBooks()

# file_path = "movies.txt"

# Read all lines from the file
# with open(file_path, "r") as file:
# 	movies = [line.strip() for line in file if line.strip()]

# addToJson("boardGames",boardGames)

# downloadImages('cities')
# calculateEntropyRatio(classes)
# extractMovies()


