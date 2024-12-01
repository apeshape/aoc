data = open("data", "r").read().splitlines()
my_timestamp = int(data[0])
busses_list = data[1].split(',')

closest_times = []
bus_dict = {}

def get_closest_bus(busses):
  closest_time = 9999999999999999
  closest_bus = 0
  for bus in busses.items():
    if bus[1] < closest_time:
      closest_time = bus[1]
      closest_bus = bus[0]
  print('closest', closest_time, closest_bus, (closest_time - my_timestamp) * closest_bus)

for bus in [int(bus) for bus in busses_list if bus != 'x']:
  bus_dict[bus] = bus
  while bus_dict[bus] < my_timestamp:
    bus_dict[bus] += bus
  

get_closest_bus(bus_dict)