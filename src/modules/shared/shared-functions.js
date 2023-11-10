export function deleteProperty(obj, property) {
  let propDeleted = false;
  let endKey = Object.keys(obj).length - 1;

  for (const key in obj) {
    if (obj[key] === property) {
      propDeleted = true;
      delete obj.key;
    }

    if (propDeleted) {
      condenseObject(obj, key, endKey);
      break;
    }
  }

  function condenseObject(obj, startKey, endKey) {
    for (let i = startKey; i < endKey; i++) {
      obj[i] = obj[+i + 1];
    }

    delete obj[endKey];
  }
}
