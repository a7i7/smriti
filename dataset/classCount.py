from math import log,ceil

for numClasses in range(10,50):
	print('',end='|')
	print(numClasses,end='|')
	print(ceil((2**132)**(1.0/numClasses)),end='|')
	print(ceil((2**264)**(1.0/numClasses)),end='|')
	print('')
