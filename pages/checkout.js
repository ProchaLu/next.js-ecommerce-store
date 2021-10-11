import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { calcTotalCount, calcTotalSum } from '../util/functions';

export default function Checkout(props) {
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

  const contactDiv = css`
    display: inline-block;
    width: 100%;
  `;

  const inputDiv = css`
    font-size: 20px;

    h2 {
      margin-top: 12px;
      margin-bottom: 12px;
    }

    input {
      width: 90%;
      margin: 8px;
      height: 32px;
      font-size: 16px;
    }
  `;

  const router = useRouter();

  const [finalCartArray] = useState(props.cartArray);

  const totalSum = calcTotalSum(finalCartArray);
  const totalCount = calcTotalCount(finalCartArray);

  const onClickBuy = () => {
    router.push('/thankyou');
  };

  return (
    <Layout>
      <div css={checkoutWrapper}>
        <div css={contactDiv}>
          <div css={inputDiv}>
            <h2>Contact Info</h2>
            <div>First Name</div>
            <input id="firstname" placeholder="Max" />
            <div>Last Name</div>
            <input id="lastname" placeholder="Mustermann" />
            <div>Mail</div>
            <input
              type="mail"
              id="mail"
              placeholder="max.mustermann@mail.com"
            />
            <div>Phone Number</div>
            <input
              type="number"
              id="phonenumber"
              placeholder="0676 123 45 67"
            />
            <hr />
          </div>
          <div css={inputDiv}>
            <h2>Shipping Info</h2>
            <div>Address</div>
            <input id="address" placeholder="Street 1/1" />
            <div>Zip Code</div>
            <input type="number" id="zipcode" placeholder="1010" />
            <div>City</div>
            <input id="city" placeholder="Vienna" />
            <div>Country</div>
            <input id="state" placeholder="Austria" />
          </div>
          <hr />
          <div css={inputDiv}>
            <h2>Credit Card Info</h2>
            <div>Credit Card Holder</div>
            <input id="creditcardholder" placeholder="Max Mustermann" />
            <div>Number</div>
            <input
              type="number"
              id="creditcardnumber"
              placeholder="4024007103939509"
            />
            <div>Expire Date</div>
            <input id="expirydate" placeholder="MM/YY" />
            <div>CCV</div>
            <input id="cvv" placeholder="123" />
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
