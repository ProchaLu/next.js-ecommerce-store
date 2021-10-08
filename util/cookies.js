import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function findProductAndAddItemCount(products, productId) {
  const productFromCookie = products.find(
    (cookieObj) => cookieObj.id === productId,
  );
  productFromCookie.itemCount += 1;
  return productFromCookie;
}

export function findProductAndRemoveItemCount(products, productId) {
  const productFromCookie = products.find(
    (cookieObj) => cookieObj.id === productId,
  );
  productFromCookie.itemCount -= 1;
  return productFromCookie;
}
