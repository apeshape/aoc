from time import sleep
from itertools import permutations
data = list(map(int, open("testdata1", "r").read().splitlines()))

data.append(0)
data.append(max(data) + 3)
data = sorted(data)

prev = data[0]
one_diffs = 1
three_diffs = 1
for adapter in data[1:]:
  diff = abs(prev - adapter)
  if diff == 1:
    one_diffs += 1
  if diff == 3:
    three_diffs += 1
  prev = adapter

def is_valid_arrangement(arr):
  first = arr[0]
  for adapter in arr[1:]:
    diff = abs(first - adapter)
    if diff > 3:
      return False
    first = adapter
  return True

def get_arrangements(arr, startIdx):
  test_num = arr[startIdx]
  possible_adapters = [num for num in arr[startIdx:] if num <= test_num + 3 and num != test_num]

  perms = list(permutations(possible_adapters))
  return perms

print(data)
acc = 1
def get_multiple_paths(numbers):
  paths = []
  prev_possible = [data[0]]
  for idx, num in enumerate(data):
    possible = [list(arr) for arr in get_arrangements(data, idx)][0]
    filtered_possible = [anum for anum in possible if anum not in prev_possible]

    if len(filtered_possible) > 1:
      paths.append(filtered_possible)

    prev_possible = possible

  return paths

def get_path_count_from(paths):
  multiple = get_multiple_paths(data)


print(multiple)