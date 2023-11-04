// Condense after Key/Value deleted
export function condenseObject(obj, startKey, endKey) {
  for (let i = startKey; i < endKey; i++) {
    obj[i] = obj[+i + 1];
  }

  delete obj[endKey];
}
