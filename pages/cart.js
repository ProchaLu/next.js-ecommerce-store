import { css } from '@emotion/react';
import {
  faMinusCircle,
  faPlusCircle,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  addItemByProductId,
  setParsedCookie,
  subtractItemByProductId,
} from '../util/cookies';
import { calcTotalCount, calcTotalSum } from '../util/functions';

const cartWrapper = css`
  width: 80vw;
  padding: 20px;
  line-height: 24px;
  text-align: center;
`;
const cartHeader = css`
  margin-top: 40px;
  display: flex;
  align-items: center;
  padding: 10px;

  button {
    float: right;
    color: #ff4136;
    font-size: 28px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const cartItemsGrid = css`
  display: grid;
  grid-template-columns: 2fr 6fr 6fr 1fr;
  border-bottom: 1px solid black;
  padding: 10px;
  align-items: center;
`;

const cartCheckout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80vw;
  margin-top: 20px;
  margin-bottom: 50px;
  line-height: 30px;
`;

const checkoutText = css`
  font-size: 24px;
`;

const checkoutButton = css`
  font-size: 24px;
  cursor: pointer;
  margin: 12px;
  width: 100%;
`;

const emptyCart = css`
  font-size: 40px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
  align-items: center;
`;

const backButton = css`
  font-size: 24px;
  cursor: pointer;
  margin: 12px;
`;

const deleteButton = css`
  font-size: 24px;
  color: #ff4136;
  cursor: pointer;
`;

const countButton = css`
  font-size: 24px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin-left: 8px;
  margin-right: 8px;
`;

const itemCountStyle = css`
  display: flex;
`;

export default function Cart(props) {
  const [shoppingCart, setShoppingCart] = useState(props.cartArray);

  /*  useEffect(() => {
    setShoppingCart(getCookies('cart'));
  }, []); */

  const router = useRouter();

  const totalSum = calcTotalSum(shoppingCart);
  const totalCount = calcTotalCount(shoppingCart);

  const onClickCheckout = () => {
    router.push('/checkout/');
  };

  const onClickBackToProducts = () => {
    router.push('/products/');
  };

  const onClickClearButton = () => {
    setParsedCookie('cart', []);
    setShoppingCart([]);
    router.push('/');
  };

  const onClickDeleteButton = (id) => {
    const cookieValue = [...props.cookieArray];
    const newCookieValue = cookieValue.filter((p) => p.id !== id);
    setParsedCookie('cart', newCookieValue);
    setShoppingCart(newCookieValue);
  };

  return (
    <Layout>
      {totalCount === 0 ? (
        <div css={emptyCart}>
          <div>NO ITEMS IN CART</div>
          <button onClick={onClickBackToProducts} css={backButton}>
            BACK TO ALL PRODUCTS
          </button>
        </div>
      ) : (
        <>
          <div css={cartHeader}>
            <h1>Shopping Cart</h1>
            <button data-cy="deleteAll-in-Cart">
              <FontAwesomeIcon icon={faTrashAlt} onClick={onClickClearButton} />
            </button>
          </div>
          <div css={cartWrapper}>
            {shoppingCart.map((product) => {
              return (
                <div key={`product-li-${product.id}`} css={cartItemsGrid}>
                  <div>
                    <Image
                      src={`/images/${product.nationality}.jpeg`}
                      width={100}
                      height={100}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>by {product.brand}</p>
                  </div>
                  <div>
                    <div css={itemCountStyle}>
                      <button
                        data-cy="minus-quantity-in-cart"
                        css={countButton}
                      >
                        <FontAwesomeIcon
                          icon={faMinusCircle}
                          onClick={() => {
                            const minusValue = subtractItemByProductId(
                              product.id,
                            );
                            setShoppingCart(minusValue);
                          }}
                        />
                      </button>
                      <div>Items: {product.itemCount}</div>
                      <button data-cy="plus-quantity-in-cart" css={countButton}>
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          onClick={() => {
                            setShoppingCart(addItemByProductId(product.id));
                          }}
                        />
                      </button>
                    </div>
                    <div>
                      Price: {product.itemCount * (product.price / 100)}€
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTimes}
                      css={deleteButton}
                      onClick={() => onClickDeleteButton(product.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div css={cartCheckout}>
            <div css={checkoutText}>
              <div>Total Items: {totalCount}</div>
              <div>Total Price: {totalSum}€</div>
            </div>
            <button
              data-cy="move-to-Checkout"
              onClick={onClickCheckout}
              css={checkoutButton}
            >
              CHECKOUT
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { getProducts } = await import('../util/database');

  const products = await getProducts();

  const rawCookie = context.req.cookies.cart;

  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  const cartArray = cookieArray.map((p) => {
    const cartObject = products.find((prod) => prod.id === p.id);

    return {
      id: cartObject.id,
      name: cartObject.name,
      price: cartObject.price,
      itemCount: p.itemCount,
      nationality: cartObject.nationality,
      brand: cartObject.brand,
    };
  });

  return {
    props: { products, cartArray, cookieArray },
  };
};
