import re
data = open("data", "r").read().splitlines()

def rule_to_dict(rulestr):
  if(rulestr != "no other bags."):
    bt = re.search(r"(\w*. \w*.)", rulestr[1:])
    return { bt.group(0).strip(): int(rulestr[:1]) }

def bag_contains(bt, total):
  for rule in bt:
    bagtype = list(rule.keys())[0]
    for _res in range(0, rule[bagtype]):
      total = bag_contains(bagtypes[bagtype], total + 1)
  return total

bagtypes = {}
for line in data:
  bagtype, contents = (lambda x = line.split(" bags contain "): [x[0], x[1].split(", ")])()
  rules = [rule_to_dict(rulestr) for rulestr in contents if rule_to_dict(rulestr)]
  bagtypes[bagtype] = rules

print(bag_contains(bagtypes["shiny gold"], 0))