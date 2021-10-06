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
    margin-bottom: 100px;
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

  const router = useRouter();

  const totalSum = calcTotalSum(finalCartArray);
  const totalCount = calcTotalCount(finalCartArray);

  const onClickBuy = () => {
    router.push('/thankyou');
  };
  return (
    <Layout>
      <div css={checkoutWrapper}>
        <div>NAME AND SO</div>
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
        </div>
      </div>
      <div>
        <div>
          <div>TOTAL ITEMS: {totalCount}</div>
          <div>TOTAL PRICE: {totalSum}€</div>
        </div>
        <button onClick={onClickBuy}>PAY {totalSum}€</button>
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
