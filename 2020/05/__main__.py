import re
ids = [int(re.sub(r"[B|R]", "1", re.sub(r"[F|L]", "0", line)), 2) for line in open("data", "r").read().splitlines()]

for seat in range(sorted(ids)[0], sorted(ids)[-1]):
  if seat not in ids:
    print(sorted(ids)[-1], seat)