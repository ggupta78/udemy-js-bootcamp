module.exports = {
  forEach(arr, fn) {
    // for (let i = 0; i < arr.length; i++) {
    //   const value = arr[i];
    //   fn(value, i);
    // }
    for (let index in arr) {
      fn(arr[index]);
    }
  },
  map(arr, fn) {
    const result = [];
    for (let index = 0; index < arr.length; index++) {
      result.push(fn(arr[index], index));
    }

    return result;
  },
};
