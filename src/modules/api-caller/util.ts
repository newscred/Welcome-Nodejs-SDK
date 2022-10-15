function isRegularObject(x: any) {
  if (typeof x === "object" && !Array.isArray(x) && x !== null) {
    return true;
  }
  return false;
}

export function convertObjectKeysToCamelCase(obj: any) {
  var newObj: any = {};
  for (let d in obj) {
    if (obj.hasOwnProperty(d)) {
      const newKey = d.replace(/(\_\w)/g, (k) => k[1].toUpperCase());
      const value = obj[d];
      if (isRegularObject(value)) {
        newObj[newKey] = convertObjectKeysToCamelCase(value);
      } else if (Array.isArray(value)) {
        newObj[newKey] = value.map((v) => {
          if (isRegularObject(v)) return convertObjectKeysToCamelCase(v);
          return v;
        });
      } else {
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
}

export function convertObjectKeysToSnakeCase(obj: any) {
  var newObj: any = {};
  for (let d in obj) {
    if (obj.hasOwnProperty(d)) {
      const newKey = d.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );

      const value = obj[d];
      if (isRegularObject(value)) {
        newObj[newKey] = convertObjectKeysToSnakeCase(value);
      } else if (Array.isArray(value)) {
        newObj[newKey] = value.map((v) => {
          if (isRegularObject(v)) return convertObjectKeysToSnakeCase(v);
          return v;
        });
      } else {
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
}
