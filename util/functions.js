export function calcTotalSum(productsArray) {
  return productsArray
    .reduce((accumulator, product) => {
      return accumulator + (product.price / 100) * product.itemCount;
    }, 0)
    .toFixed(2);
}

export function calcTotalCount(productsArray) {
  return productsArray
    .map((product) => product.itemCount)
    .reduce((total, currentCount) => total + currentCount, 0);
}
