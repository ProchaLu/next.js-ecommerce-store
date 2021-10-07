import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { calcTotalCount, calcTotalSum } from '../util/functions';

export default function Checkout(props) {
  const [finalCartArray] = useState(props.cartArray);

  const checkoutWrapper = css`
    display: grid;
    grid-template-columns: 3fr 2fr;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 90vw;
    align-items: center;
  `;

  const checkoutItems = css`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    column-gap: 10px;
  `;

  const checkoutItemColumn = css`
    line-height: 20px;
    padding: 4px;
    align-items: flex-start;
  `;

  const paymentDiv = css`
    position: relative;
    align-items: center;
    text-align: center;
  `;

  const paymentButton = css`
    font-size: 24px;
    cursor: pointer;
    width: 90vw;
    margin-bottom: 50px;
  `;

  const totalCart = css`
    font-size: 32px;
    line-height: 50px;
    font-weight: bold;
  `;

  const router = useRouter();

  const totalSum = calcTotalSum(finalCartArray);
  const totalCount = calcTotalCount(finalCartArray);

  const onClickBuy = () => {
    router.push('/thankyou');
  };
  return (
    <Layout>
      <div css={checkoutWrapper}>
        <div>
          <div>
            <h2>Contact Info</h2>
            <div>
              Frist Name
              <input />
              Last Name
              <input />
            </div>
            <div>
              Mail <input />
            </div>
            <div>
              Phone Number
              <input />
            </div>
            <hr />
          </div>
          <div>
            <h2>Shipping Info</h2>
            <div>
              Address
              <input />
            </div>
            <div>
              ZIP Code
              <input />
            </div>
            <div>
              City
              <input />
            </div>
            <div>
              Country
              <input />
            </div>
          </div>
          <hr />
          <div>
            <h2>Credit Card Info</h2>
            <div>
              Holder
              <input />
            </div>
            <div>
              Number
              <input />
            </div>
            <div>
              Expire Date
              <input />
              CVV
              <input />
            </div>
          </div>
        </div>
        <div>
          {finalCartArray.map((product) => {
            return (
              <div css={checkoutItems} key={`product-li-${product.id}`}>
                <div css={checkoutItemColumn}>
                  <Image
                    src={`/../public/images/${product.nationality}.jpeg`}
                    width={75}
                    height={75}
                    alt={product.name}
                  />
                </div>
                <div css={checkoutItemColumn}>
                  <h4>
                    {product.itemCount} x {product.name}
                  </h4>
                  <p>by {product.brand}</p>
                </div>
                <div css={checkoutItemColumn}>
                  <h4>{product.itemCount * (product.price / 100)}€</h4>
                </div>
              </div>
            );
          })}
          <hr />
          <div css={totalCart}>
            <div>Total Items: {totalCount}</div>
            <div>Total Price: {totalSum}€</div>
          </div>
        </div>
      </div>
      <div css={paymentDiv}>
        <button css={paymentButton} onClick={onClickBuy}>
          Pay {totalSum}€
        </button>
      </div>
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
