def get_passports():
  data = open("data", "r").read()
  passports = []

  for passportLine in data.split('\n\n'):
    passport = {}
    for part in passportLine.replace('\n', ' ').split(' '):
      key, value = part.split(':')
      passport[key] = value

    passports.append(passport)
  
  return passports

def in_range(minMax, val):
  minVal, maxVal = minMax
  return minVal <= val <= maxVal

height_rules = {
  "cm": [150, 193],
  "in": [59, 76]
}

validators = {
  "byr": lambda val: in_range([1920, 2002], int(val)),
  "iyr": lambda val: in_range([2010, 2020], int(val)),
  "eyr": lambda val: in_range([2020, 2030], int(val)),
  "hgt": lambda val: val[-2:] in height_rules.keys() and in_range(height_rules[val[-2:]], int(val[:-2])),
  "hcl": lambda val: len(val) > 1 and val[0] == '#' and len(val[1:]) == 6,
  "ecl": lambda val: val in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
  "pid": lambda val: len(val) == 9
}

def passport_is_valid(passport): 
  for needed_key in validators.keys():
    if not needed_key in passport.keys() or not validators[needed_key](passport[needed_key]):
      return False
  return True

passports = get_passports()

valids = 0
for passport in passports:
  if passport_is_valid(passport):
    valids += 1

print(valids)