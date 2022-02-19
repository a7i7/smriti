from math import ceil

entropy = 2 ** 128

for i in range(10,50):
	# print(i,entropy**(1/i))
	numChoices = i
	numElements = ceil(entropy**(1.0/i))
	print(str(numElements)+' elements with '+str(numChoices)+' choices each')
