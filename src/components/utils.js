export const formatData = (data) => {
  const searchData = { info: {}, list: [] };
  if (data) {
    searchData.info = data.info ? { ...data.info } : {};
    searchData.list = data.results
      ? data.results?.map((itemObj) => {
          return {
            id: itemObj.id,
            name: itemObj.name,
          };
        })
      : [];
  }
  return searchData;
};

export const debounce = (func, wait, immediate) => {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
