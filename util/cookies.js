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

export function getCookies(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export function setCookies(key, value) {
  Cookies.set(key, JSON.stringify(value));
  return;
}
/* export function findProductAndAddItemCount(products, productId) {
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
} */

export function subtractItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = getParsedCookie('cart') || [];

  // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);

  if (productIdInCookie.itemCount > 1) {
    productIdInCookie.itemCount = productIdInCookie.itemCount - 1;
  } else {
    // get index of product with the id that's passed as a parameter
    const removeIndex = newCookieValue
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);

    // remove object
    newCookieValue.splice(removeIndex, 1);
  }
  setParsedCookie('cart', newCookieValue);
  return newCookieValue;
}

export function addItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = getParsedCookie('cart') || [];

  // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);

  if (productIdInCookie) {
    productIdInCookie.itemCount = productIdInCookie.itemCount + 1;
  } else {
    newCookieValue.push({
      id: id,
      itemCount: 1,
    });
  }

  // this function creates the cookie
  setParsedCookie('cart', newCookieValue);

  return newCookieValue;
}
