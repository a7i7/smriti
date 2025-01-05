from math import ceil

entropy128 = 2 ** 128
entropy256 = 2 ** 256


for i in range(10,50):
	# print(i,entropy**(1/i))
	numChoices = i
	numElements128 = ceil(entropy128**(1.0/i))
	numElements256 = ceil(entropy256**(1.0/i))

	print("|"+str(numChoices)+"|"+str(numElements128)+"|"+str(numElements256)+"|")
	# print(str(numElements)+' elements with '+str(numChoices)+' choices each')
