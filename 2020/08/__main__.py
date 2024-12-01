from time import sleep
program = open("data", "r").read().splitlines()

def jmp(val, pc, acc):
  pc += val
  return [pc, acc]

def _acc(val, pc, acc):
  acc += val
  return [pc, acc]

def nop(val, pc, acc):
  return [pc, acc]

instructions = {
  "jmp": jmp,
  "acc": _acc,
  "nop": nop
}

pc = 0 
acc = 0
instructions_run = []
jmps_changed = []
nops_changed = []
has_switched = False
while pc < len(program):
  if pc in instructions_run:
    has_switched = False
    pc = 0
    acc = 0
    instructions_run.clear()
  else:
    instructions_run.append(pc)

  instr, val = program[pc].split(' ')
  if instr == 'jmp':
    if pc not in jmps_changed and not has_switched:
      instr = 'nop'
      jmps_changed.append(pc)
      has_switched = True
  if instr == 'nop':
    if pc not in nops_changed and not has_switched:
      instr = 'jmp'
      nops_changed.append(pc)
      has_switched = True

  pc, acc = instructions[instr](int(val), pc, acc)
  if(instr == "jmp"):
    continue
  
  pc += 1

print('clean exit', acc)
sleep(0.2)

