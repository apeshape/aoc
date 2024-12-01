from functools import reduce

def checkAnswers(acc, group):
  answers = group.split('\n')
  return acc + len(set(answers[0]).intersection( *answers[1:] ))

print(reduce(checkAnswers, open("data", "r").read().split("\n\n"), 0))