import re
data = open("data", "r").read().splitlines()

mem = {}

def format_value(value):
  formatted_val = format(int(value), 'b')
  formatted_val = '0' * (36 - len(formatted_val)) + formatted_val

  return formatted_val

def resolve_masked_addr(mask, addr, resolved):
  new_mask = list(mask)
  for idx, x in enumerate(mask):
    if x == 'X':
      for i in range(0,2):
        new_mask[idx] = str(i)
        joined = ''.join(new_mask)
        if joined.count('X') == 0:
          possible_addr = int(joined, 2)
          if possible_addr not in resolved:
            resolved.append(possible_addr)


        resolve_masked_addr(joined, addr, resolved)        

  return [new_mask, resolved]

def do_apply(mask, addr):
  formatted_addr = format_value(addr)
  applied_mask = []

  for idx, x in enumerate(list(mask)):
    if x == 'X':
      applied_mask.append(x)
    elif int(formatted_addr[idx]) | int(x):
      applied_mask.append("1")
    else:
      applied_mask.append("0")
  return ''.join(applied_mask)


def apply_mask_to_addr(mask, addr):
  formatted_addr = format_value(addr)
  applied_mask = do_apply(mask, addr)
  resolved = resolve_masked_addr(applied_mask, formatted_addr, [])[1]
  return resolved

mask = ''
for instr in data:
  instr_type, value = instr.split(' = ')
  if instr_type == 'mask':
    mask = value
  else:
    val = int(value)
    address_match = re.match(r"mem\[(\d*)\]", instr_type)
    addr = address_match.groups(0)[0]
    
    possible_addresses = apply_mask_to_addr(mask, addr)
    for address in possible_addresses:
      mem[address] = val

print('sum', sum(mem.values()))