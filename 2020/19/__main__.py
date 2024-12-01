rulesInput, mesages = open("testdata", "r").read().split('\n\n')

rules = {}
for ruleInput in rulesInput.split('\n'):
  ruleId, rule = ruleInput.split(': ')
  rules[ruleId] = [r.strip('"') for r in rule.split(' | ')]

def resolve_rule(rule_key, resolved_str = ''):
  sub_rules = rules[rule_key]
  print('resolving key', rule_key)
  for sub_rule in sub_rules:
    if sub_rule == 'a' or sub_rule == 'b':
      print(sub_rule)
      resolved_str += sub_rule
      return '(' + resolved_str
    else:
      for sub_rule_key in sub_rule.split(' '):
        resolved_str += resolve_rule(sub_rule_key) + ')'
    resolved_str += '|'
  return resolved_str + '|'

for first_rule in rules['0'][0].split(' '):
  print('parse:', first_rule)
  # print(resolve_rule(first_rule))
  resolved = resolve_rule(first_rule)
  print(resolved)
  # print(resolved.replace('|||',')|(').replace('||', ')('))


# rs = parse_rule(rules["0"])
# print(rs)
