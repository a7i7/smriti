
import requests
import os
import urllib.request
import shutil
import math
import csv
import json
import math

PEXELSAPI_KEY = '563492ad6f91700001000001252b83e783bf42e9b16e8907d260f883'


classes = {
	'fruits' : [
		'apple',
		'apricot',
		'banana',
		'blueberry',
		'cherry',
		'coconut',
		'grape',
		'guava',
		'jackfruit',
		'kiwifruit',
		'lemon',
		'lychee',
		'mango',
		'orange',
		'pear',
		'pineapple',
		'pomegranate',
		'strawberry',
	],
	'animals': [
		'squirrel',
		'dog',
		'pig',
		'lion',
		'mouse',
		'monkey',
		'elephant',
		'fox',
		'panda',
		'kangaroo',
		'cow',
		'leopard',
		'coyote',
		'hedgehog',
		'chimpanzee',
		'walrus',
		'goat',
		'koala',
		'hippopotamus',
		'sheep',
		'raccoon',
		'ox',
		'otter',
		'horse',
		'mole',
		'giraffe',
		'deer',
	],
	'birds' : [
		'Woodpecker',
		'Pigeon',
		'Peacock',
		'Rooster',
		'Vulture',
		'Swallow',
		'Seagull',
		'Quail',
		'Duck',
		'Pelican',
		'Parrot',
		'Turkey',
		'Crane',
		'Kingfisher',
		'Hummingbird',
		'Sparrow',
		'Ostrich',
		'Crow',
		'Raven',
		'Dove',
		'Hen',
		'Nightingale',
		'Eagle',
		'Swan',
		'Penguin',
		'Flamingo',
		'Goose',
		'Cuckoo',
		'Owl',
		'Hawk',
		'Goldfinch',
		'Robin',
		'Finch',
		'Stork',
		'Hornbill',
		'Bulbul',
		'Skylark',
		'Canary',
		'Wagtail',
		'Macaw',
		'Cockatoo',
		'Heron',
		'Toucan',
		'Jay',
		'Mynah',
		'Cardinal',
		'Chickadee',
		'Bluebird',
		'Swift',
		'Kiwi',
		'Mockingbird',
		'Pheasant',
		'Kite',
		'Falcon',
		'Mallard',
		'Bald eagle',
		'Night hawk',
		'Crossbill',
		'Puffin',
		'Koyal',
		'Emu',
	],
	'cities':[
		'Tokyo',
		'Delhi',
		'Shanghai',
		'São Paulo',
		'Mexico City',
		'Cairo',
		'Mumbai',
		'Beijing',
		'Dhaka',
		'Osaka',
		'New York City',
		'Karachi',
		'Buenos Aires',
		'Chongqing',
		'Istanbul',
		'Kolkata',
		'Manila',
		'Lagos',
		'Rio de Janeiro',
		'Guangzhou',
		'Los Angeles',
		'Moscow',
		'Shenzhen',
		'Lahore',
		'Bangalore',
		'Paris',
		'Bogotá',
		'Jakarta',
		'Chennai',
		'Lima',
		'Bangkok',
		'Seoul',
		'Nagoya',
		'Hyderabad',
		'London',
		'Tehran',
		'Chicago',
		'Nanjing',
		'Wuhan',
		'Ho Chi Minh City',
		'Luanda',
		'Ahmedabad',
		'Kuala Lumpur',
		'Hong Kong',
		'Hangzhou',
		'Foshan',
		'Shenyang',
		'Riyadh',
		'Baghdad',
		'Santiago',
		'Surat',
		'Madrid',
		'Suzhou',
		'Pune',
		'Harbin',
		'Houston',
		'Dallas',
		'Toronto',
		'Dar es Salaam',
		'Miami',
		'Belo Horizonte',
		'Singapore',
		'Philadelphia',
		'Atlanta',
		'Fukuoka',
		'Khartoum',
		'Barcelona',
		'Johannesburg',
		'Saint Petersburg',
		'Qingdao',
		'Dalian',
		'Washington, D.C.',
		'Yangon',
		'Alexandria',
		'Jinan',
		'Guadalajara',
	],
	'countries' : [
		'Afghanistan',
		'Albania',
		'Algeria',
		'Andorra',
		'Angola',
		'Antigua & Deps',
		'Argentina',
		'Armenia',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bhutan',
		'Bolivia',
		'Bosnia Herzegovina',
		'Botswana',
		'Brazil',
		'Brunei',
		'Bulgaria',
		'Burkina',
		'Burundi',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Cape Verde',
		'Central African Rep',
		'Chad',
		'Chile',
		'China',
		'Colombia',
		'Comoros',
		'Congo',
		'Congo {Democratic Rep}',
		'Costa Rica',
		'Croatia',
		'Cuba',
		'Cyprus',
		'Czech Republic',
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'East Timor',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Ethiopia',
		'Fiji',
		'Finland',
		'France',
		'Gabon',
		'Gambia',
		'Georgia',
		'Germany',
		'Ghana',
		'Greece',
		'Grenada',
		'Guatemala',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Honduras',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran',
		'Iraq',
		'Ireland {Republic}',
		'Israel',
		'Italy',
		'Ivory Coast',
		'Jamaica',
		'Japan',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		'Korea North',
		'Korea South',
		'Kosovo',
		'Kuwait',
		'Kyrgyzstan',
		'Laos',
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Macedonia',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Mauritania',
		'Mauritius',
		'Mexico',
		'Micronesia',
		'Moldova',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Morocco',
		'Mozambique',
		'Myanmar, {Burma}',
		'Namibia',
		'Nauru',
		'Nepal',
		'Netherlands',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines',
		'Poland',
		'Portugal',
		'Qatar',
		'Romania',
		'Russian Federation',
		'Rwanda',
		'St Kitts & Nevis',
		'St Lucia',
		'Saint Vincent & the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome & Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'Sudan',
		'Suriname',
		'Swaziland',
		'Sweden',
		'Switzerland',
		'Syria',
		'Taiwan',
		'Tajikistan',
		'Tanzania',
		'Thailand',
		'Togo',
		'Tonga',
		'Trinidad & Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Vatican City',
		'Venezuela',
		'Vietnam',
		'Yemen',
		'Zambia',
		'Zimbabwe',
	],


}

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

def generateTable():
	f = open('allData.json','r')
	d = json.load(f)
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
	with open("recipes.csv", mode='r', encoding='utf-8') as csv_file:
		csv_reader = csv.DictReader(csv_file)

		# Read rows into a list of dictionaries
		data = []
		for row in csv_reader:
			data.append({
				"title" : row.get("title"),
				"link" : row.get("link")
			})
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

splitAllData()
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


