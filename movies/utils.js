const debounce = (func, delay = 2000) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
