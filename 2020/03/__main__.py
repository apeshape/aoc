data = open("data", "r").read().splitlines()

print(len(data))

def checkStep(stepX, stepY):
  hits = 0
  x, y = 0, 0
  
  strlen = len(data[0])
  
  while y < len(data) - 1 :
    outstr = list(data[y])
    outstr[x] = "O"
    outstr = "".join(outstr)
    print('{:>4}'.format(y), outstr, '{:>4}'.format(y), '{:>2}'.format(x), data[y][x], data[y][x] == "#", hits)

    y += stepY
    x += stepX

    if x > strlen - 1:
      x = x - strlen

    if data[y][x] == "#":
      hits += 1
  return hits

s1 = checkStep(1,1)
s2 = checkStep(3,1)
s3 = checkStep(5,1)
s4 = checkStep(7,1)
s5 = checkStep(1,2)

print(s1, s2, s3, s4, s5)
print(s1 * s2 * s3 * s4 * s5)