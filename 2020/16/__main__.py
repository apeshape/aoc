from functools import reduce
[rules_input, my_ticket_input, other_tickets_input] = open("data", "r").read().split('\n\n')

rules = {}
for ruleLine in rules_input.split('\n'):
  [ruleType, ruleValues] = ruleLine.split(': ')
  ruleRangesStrs = ruleValues.split(' or ')
  ranges = [[int(i) for i in r.split('-')] for r in ruleRangesStrs]
  rules[ruleType] = ranges

my_ticket = [int(n) for n in my_ticket_input.split('\n')[1].split(',')]
other_tickets = [[int(i) for i in ot.split(',')] for ot in other_tickets_input.split('\n')[1:]]

def ticket_is_valid(ticket):
  invalid_numbers = []
  for ticket_value in ticket:
    valid = False
    for rule in rules.values():
      for rule_range in rule:
        if ticket_value in range(rule_range[0], rule_range[1] + 1):
          valid = True
          break
        else:
          valid = False
      if valid:
        break
    if not valid:
      invalid_numbers.append(ticket_value)

  return len(invalid_numbers) == 0

def number_in_rule_range(num, rule_ranges):
  lower, upper = rule_ranges
  return num in range(lower[0], lower[1] + 1) or num in range(upper[0], upper[1] + 1)

def get_new_test_dict():
  test_dict = {}
  for rule_name in rules.keys():
    test_dict[rule_name] = []
  return test_dict

def get_fields(valid_tickets, fields):
  ticket_size = len(valid_tickets[0])
  for idx in range(0, ticket_size):
    test_dict = get_new_test_dict()
    for ticket in valid_tickets:
      for rule_name, rule_ranges in rules.items():
        test_dict[rule_name].append(number_in_rule_range(ticket[idx], rule_ranges))

    num_found = 0
    found = ('', None)
    for rn, test_results in test_dict.items():
      reduced_val = sum(test_results)
      if reduced_val == len(valid_tickets) and rn not in fields.keys():
        num_found += 1
        found = (rn, idx)
    
    if num_found == 1:
      f_name, f_idx = found
      fields[f_name] = f_idx

  return fields


valid_tickets = [my_ticket]
for other_ticket in other_tickets:
  if ticket_is_valid(other_ticket):
    valid_tickets.append(other_ticket)

fields = {}
for i in range(0,20):
  fields = get_fields(valid_tickets, fields)

departure_positions = []
last = None
for key, value in fields.items():
  if 'departure' in key:
    departure_positions.append(my_ticket[value])

sum_total = reduce((lambda x, y: x*y), departure_positions)
print(sum_total)