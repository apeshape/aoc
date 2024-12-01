from operator import add, sub, mul
all_lines = open("data", "r").read().splitlines()

operations = {
  '*': mul,
  '+': add,
}

def getSubExpression(line):
  sub_expression = ''
  parencount = 1
  idx = 1
  while parencount > 0:
    char = line[idx]
    if char == ')':
      parencount -= 1
      if parencount == 0:
        break
    if char == '(':
      parencount += 1
    
    sub_expression += char
    
    idx += 1
  return sub_expression

def evaluateFrame(frame):
  lh, op, rh = frame
  return operations[op](int(lh), int(rh))

def parseLine(startline):
  stack = []
  shouldEvaluate = False
  line = startline.replace(' ', '')
  lineList = list(line)
  idx = 0
  while idx < len(lineList):
    char = lineList[idx]
    if char.isdigit():
      stack.append(char)
    if char == '+' or char == '*':
      stack.append(char)
      if char == '+':
        shouldEvaluate = True
    if char == '(':
      subexprstart = line[idx:]
      subexpr = getSubExpression(subexprstart)
      idx += len(subexpr)
      parsed = parseLine(subexpr)
      stack.append(parsed)

    if len(stack) >= 3 and shouldEvaluate and stack[1].isdigit():
      f = stack[-3:]
      evaluated = evaluateFrame(f)
      stack = stack[:-3]
      stack.append(str(evaluated))
      shouldEvaluate = False
    idx += 1
  
  while len(stack) > 1:
    f = stack[-3:]
    evaluated = evaluateFrame(f)
    stack = stack[:-3]
    stack.append(str(evaluated))

  return stack[0]

total = 0
for line in all_lines:
  total += int(parseLine(line))

print('done', total)
