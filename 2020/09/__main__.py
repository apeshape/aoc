data = list(map(int, open("data", "r").read().splitlines()))

def get_checksums(preamble, result):
  if(len(preamble) == 0): return result
  result.extend([num + preamble[0] for num in preamble[1:]])
  return get_checksums(preamble[1:], result)

def get_corrupt_number(preamble_size):
  for i, _ in enumerate(data):
    if data[i + preamble_size] not in get_checksums(data[i:i+preamble_size], []):
      return data[i + preamble_size]

def find_corrupt_set(corrupt):
  for i, _ in enumerate(data):
    continousSet = []
    for num in data[i:]:
      continousSet.append(num)
      set_sum = sum(continousSet)
      if set_sum == corrupt:
        return continousSet
      if set_sum > corrupt:
        break

corrupt = get_corrupt_number(25)
corrupt_set = find_corrupt_set(corrupt)

print('part1', corrupt)
print('part2', min(corrupt_set) + max(corrupt_set))