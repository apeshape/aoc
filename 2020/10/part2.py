import json
data = list(map(int, open("data", "r").read().splitlines()))

data.append(0)
data.append(max(data) + 3)
data = sorted(data)

def joltComposer(chargers, node, mem = {}):
  current = chargers[0]
  rest = chargers[1:]

  if current in mem.keys():
    return mem[current]
  for idx, testNum in enumerate(rest):
    diff = testNum - current
    if diff <= 3:
      node['children'][testNum] = joltComposer(rest[idx:], {"children": {}})
    else:
      break
  mem[current] = node
  return node

def crawlTree(childTree, count = 0, mem = {}):
  for key in childTree.keys():
    if key in mem.keys():
      count += mem[key]
      continue
    node = childTree[key]
    if key == max(data) and len(node['children'].keys()) == 0:
      return count + 1
    else:
      count = crawlTree(node['children'], count, mem)
      mem[key] = count
  return count

tree = {
  0: {
    "children": {}
  }
}

joltComposer(data, tree[0])
c = crawlTree(tree)

print(c)