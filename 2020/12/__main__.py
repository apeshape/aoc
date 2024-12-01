import operator
data = open("data", "r").read().splitlines()

moves = [{movestr[0]: int(movestr[1:])} for movestr in data]

dirs = {
  'E':1,
  'S':-1,
  'W':-1,
  'N':1
}

def turn_ship(turn_move, curr_dir):
  moves_list = ['E', 'S', 'W', 'N']
  new_move_key_idx = moves_list.index(curr_dir)
  turnkey = list(turn_move.keys())[0]
  turnval = turn_move[turnkey]
  skips = int(4 * (turnval / 360))
  if turnkey == 'L':
    skips *= -1
  new_move_key_idx += skips
  return moves_list[new_move_key_idx % len(moves_list)]

def roll(arr, steps):
  new_arr = arr.copy()
  for idx, el in enumerate(arr):
    new_arr[(idx + steps) % len(arr)] = el
  return new_arr

def rotate_waypoint(turn_move, wpvalues):
  turnkey = list(turn_move.keys())[0]
  turnval = turn_move[turnkey]

  skips = int(4 * (turnval / 360))
  if turnkey == 'L':
    skips *= -1
  shifted = roll(list(wpvalues.values()), skips)

  wpvalues['E'] = shifted[0]
  wpvalues['S'] = shifted[1]
  wpvalues['W'] = shifted[2]
  wpvalues['N'] = shifted[3]

  return wpvalues

wpvalues = {
  'E': 10,
  'S': 0,
  'W': 0,
  'N': 1
}

boatpos = (0,0)
current_dir_key = 'E'
for move in moves:
  dirkey = list(move.keys())[0]
  moveval = move[dirkey]
  
  waypoint = (wpvalues['E'] + (wpvalues['W'] * -1), (wpvalues['N'] * -1) + (wpvalues['S']))

  if dirkey == 'R' or dirkey == 'L':
    wpvalues = rotate_waypoint(move, wpvalues)
    continue
  elif dirkey == 'F':
    current_dir = dirs[current_dir_key]
    move_mag = (waypoint[0] * moveval, waypoint[1] * moveval)
    boatpos = tuple(map(operator.add, move_mag, boatpos))

  else:
    wpvalues[dirkey] += moveval

print(boatpos, boatpos[0] + boatpos[1])