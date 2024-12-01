import re
data = open("data", "r").read().splitlines()

validCount = 0

for line in data:
  rules, password = line.split(':')
  password = line.split(':')[1]
  ruleParts = rules.split(' ')[0]
  letter = rules.split(' ')[1]

  min, max = ruleParts.split('-')

  occurences = password.find(letter)

  l1 = password[int(min)]
  l2 = password[int(max)]

  valid = bool(l1 == letter) ^ bool(l2 == letter)


  if(valid == True):
    validCount += 1
  else:
    print('Not valid', l1, l2, letter)


  # if(occurences >= int(min) and occurences <= int(max)):
  #   validCount += 1

print(validCount)