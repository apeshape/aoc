import re
from operator import add, sub, mul
# all_lines = open("data", "r").read().splitlines()
# data = "(2 + 7 * (3 + 5 * 2 + 3 + 6) * (4 * 6 + 8 * 3 * 2 + 7)) + 3 * ((2 + 8 + 6) * 8 + 9 * 6 * 6) + 5 + 6 + 5"
# data = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"
# data = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"
# data = "1 + 2 * (3 + 4) * 5 + 6"
# data = "1 + (2 * 3) + (4 * (5 + 6))"
data = "1 + 2 * 3 + 4 * 5 + 6"

operations = {
  '*': lambda x, y: mul(x, y),
  '+': lambda x, y: add(x, y),
  '-': lambda x, y: sub(x, y),
}

def resolve_additions(sequence):
  expr = list(sequence.replace(' ', ''))
  resolved = ''
  idx = 0
  prev = None
  operator = None
  while idx < len(expr):
    char = expr[idx]
    print(char)
    if re.match(r"\d", char):
      digit = int(char)
      if not prev:
        prev = digit
      else:
        if operator == '+':
          prev = operations[operator](prev, digit)
        else:
          resolved += str(prev)
          resolved += operator
    elif char in operations.keys():
      operator = char
    idx += 1
  return resolved

def calculate(sequence, lvl = 1):
  prev = None
  operator = None
  expr = list(resolve_additions(sequence)) #list(sequence.replace(' ', ''))

  sub_expression = ''
  # in_sub_expr = False
  parencount = 0
  idx = 0
  while idx < len(expr):
    char = expr[idx]
    print('-' * lvl, 'char', char)
    if char == '(':
      parencount += 1
      sub_idx = idx + 1
      while parencount > 0:
        next_char = expr[sub_idx]
        if next_char == '(':
          parencount += 1
        if next_char == ')':
          parencount -= 1
          if parencount > 0:
            sub_expression += next_char 
          sub_idx += 1
          continue
        sub_expression += next_char
        sub_idx += 1
      idx = sub_idx - 1
      # print('a sub expression', '({})'.format(sub_expression))
      if operator:
        prev = operations[operator](prev, calculate(sub_expression))
        sub_expression = ''
      else:
        prev = calculate(sub_expression)
        sub_expression = ''
      # print('==', prev)

    elif re.match(r"\d", char):
      digit = int(char)
      if not prev:
        prev = digit
      else:
        # print('calc', prev, operator, digit)
        prev = operations[operator](prev, digit)
        # print('==', prev)
    elif char in operations.keys():
      operator = char
    
    idx += 1

  # print(prev)
  return prev

# print(all_lines)
# result = 0
# for line in all_lines:
#   # r = calculate(line)
#   # print(r)
#   result += calculate(line)
# print(result)

print(resolve_additions(data))