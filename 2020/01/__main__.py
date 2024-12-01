data = open("data", "r").read().splitlines()
for coin in data:
  icoin = int(coin)
  for comp in data:
    icomp = int(comp)
    for comp2 in data:
      icomp2 = int(comp2)
      if((icoin + icomp + icomp2) == 2020):
        print(icoin * icomp * icomp2)