data = '12,1,16,3,11,0'
# data = '1,3,2'
# data = '0,3,6'
input_list = data.split(',')

numbers = [int(num) for num in input_list]

spoken = {}
for idx, num in enumerate(numbers):
  spoken[num] = [idx + 1]

turns = len(spoken.keys())
last_spoken = numbers[-1]
while turns < 2020:
  if last_spoken in spoken.keys():
    spoken[last_spoken].append(turns)
    diff = spoken[last_spoken][-1] - spoken[last_spoken][-2]
    last_spoken = diff
  else:
    spoken[last_spoken] = [turns]
    last_spoken = 0

  turns += 1

print('DONE', last_spoken)

## alt. solution:
#
# def indices(arr, search):
#   return [idx for idx, el in enumerate(arr) if el == search]

# turns = len(numbers)
# while turns < 2020:
#   last_spoken = numbers[-1]
#   idxs = indices(numbers, last_spoken)
#   if len(idxs) > 1:
#     numbers.append(idxs[-1] - idxs[-2])
#   else:
#     numbers.append(0)
#   turns += 1
# print(numbers[-1])
