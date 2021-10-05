import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { calcTotalCount, calcTotalSum } from '../util/functions';

export default function Cart(props) {
  const cartWrapper = css`
    width: 80vw;
    padding: 20px;
    line-height: 24px;
  `;
  const cartHeader = css`
    margin: auto;
    display: flex;
    align-items: center;
    padding: 10px;
  `;
  const cartItemsGrid = css`
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
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

  const [shoppingCart, setShoppingCart] = useState(props.cartArray);

  const router = useRouter();

  const totalSum = calcTotalSum(shoppingCart);
  const totalCount = calcTotalCount(shoppingCart);

  const onClickCheckout = () => {
    router.push('/checkout');
  };

  const onClickBackToProducts = () => {
    router.push('/products');
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
          <div css={cartWrapper}>
            <div css={cartHeader}>
              <h1>Shopping Cart</h1>
            </div>
            {shoppingCart.map((product) => {
              return (
                <div key={`product-li-${product.id}`} css={cartItemsGrid}>
                  <div>
                    <Image
                      src={`/../public/images/${product.nationality}.jpeg`}
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
                    <div>Items: {product.itemCount}</div>
                    <div> Price: {product.itemCount * product.price}€</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div css={cartCheckout}>
            <div css={checkoutText}>
              <div>TOTAL ITEMS: {totalCount}</div>
              <div>TOTAL PRICE: {totalSum}€</div>
            </div>
            <button onClick={onClickCheckout} css={checkoutButton}>
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
    props: { products, cartArray },
  };
};
