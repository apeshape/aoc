from functools import reduce
data = open("data", "r").read().splitlines()
my_timestamp = int(data[0])
buslist = data[1]
busses_list = buslist.split(',')

def test_all_busses(timestamp, busses):
  offset = 0
  for bus in busses:
    if bus == 'x':
      offset += 1
      continue
    if not (timestamp + offset) % bus == 0:
      return False
    else:
      offset += 1
  return True

def get_timestamp_for_list(bus_list, smallest_jump, start_at):
  ts = start_at
  while not test_all_busses(ts, bus_list):
    ts += smallest_jump

  return ts

start_at = 0
max_jmp = int(busses_list[0])
list_to_test = []
timestamp_start_at = max_jmp
for idx, bus in enumerate(busses_list):
  if bus == 'x':
    list_to_test.append('x')
    continue
  list_to_test.append(int(bus))
  timestamp_start_at = get_timestamp_for_list(list_to_test, max_jmp, timestamp_start_at)
  max_jmp = reduce((lambda x, y: x * y), [num for num in list_to_test if type(num) == int])

print('TIMESTAMP FOUND', timestamp_start_at, max_jmp)