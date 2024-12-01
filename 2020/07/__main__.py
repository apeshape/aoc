import re
data = open("data", "r").read().splitlines()

bags = []
def check_bagtype(bagtype):
  for line in data:
    bt, contains = line.split('contain')

    gb_contains = re.search('('+bagtype+')', contains)

    if gb_contains:
      container = bt.replace(' bags', '')
      if container not in bags:
        bags.append(container)

      check_bagtype(container)

check_bagtype('shiny gold')
print(len(bags))
