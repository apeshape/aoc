import data from "./data.json" with {type: 'json'};

let sum = 0;

const handleNode = (node: any) => {
  if(Array.isArray(node)){
    node.forEach(n => handleNode(n))
    return
  }
  if(typeof node === 'object'){
    Object.entries(node).forEach(([k, v]) => handleNode(v))
    return
  }
  if(typeof node === 'number'){
    sum += node;
  }
}

let sum2 = 0;
const handleNodeWithRed = (node: any) => {
  if(Array.isArray(node)){
    node.forEach(n => handleNodeWithRed(n))
    return
  }
  if(typeof node === 'object'){
    if(!hasRed(node)){
      Object.entries(node).forEach(([k, v]) => handleNodeWithRed(v))
    }
    return
  }
  if(typeof node === 'number'){
    sum2 += node;
  }
}
function hasRed(node: any) {
  return Boolean(Object.entries(node).find(([k, v]) => v === 'red'))
}


handleNode(data)
console.log(sum)
handleNodeWithRed(data)
console.log(sum2)

// console.log(hasRed({"c":"green","b":2}))


