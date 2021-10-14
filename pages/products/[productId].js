import { css } from '@emotion/react';
import {
  faMinusCircle,
  faPlusCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  addItemByProductId,
  getParsedCookie,
  setParsedCookie,
  subtractItemByProductId,
} from '../../util/cookies';

const productDetailsWrapper = css`
  padding-top: 50px;
  margin-bottom: 50px;

  h1 {
    text-align: center;
    font-size: 40px;
  }
`;

const productContent = css`
  grid-gap: 50px;
  margin-bottom: 50px;
  padding-top: 50px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  align-items: center;
`;

const productContentImage = css`
  margin: 20px;
`;

const productContentText = css`
  margin: 12px;

  h3 {
    margin: 12px;
  }

  p {
    margin: 12px;
    font-size: 40px;
  }
`;

const countButton = css`
  font-size: 24px;
  cursor: pointer;
  margin: 12px;
  border: none;
  background-color: transparent;
`;

const cartButton = css`
  font-size: 24px;
  cursor: pointer;
  margin: 12px;
  width: 90%;
`;

const countDiv = css`
  font-size: 32px;
`;

export default function Products(props) {
  const router = useRouter();

  const [cart, setCart] = useState(getParsedCookie('cart') || []);

  const userCookieObject = cart.find(
    (cookieObj) => cookieObj.id === props.singleProduct.id,
  );

  const initialItemCount = userCookieObject ? userCookieObject.itemCount : 1;

  const [itemCount, setItemCount] = useState(initialItemCount);

  // add to cart
  const addToCartHandler = () => {
    if (props.singleProduct.itemStock < itemCount) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    const currentCookie = getParsedCookie('cart') || [];

    const isItemInCart = currentCookie.some((cookieObject) => {
      return cookieObject.id === props.singleProduct.id; // id that comes from the URL
    });
    let newCookie;
    if (isItemInCart) {
      newCookie = currentCookie.filter(
        (cookieObject) => cookieObject.itemCount + 1,
      );
    } else {
      // add the new product
      newCookie = [...currentCookie, { id: props.singleProduct.id, itemCount }];
    }
    setParsedCookie('cart', newCookie);
    setCart(newCookie);
    router.push('/cart/');
  };

  return (
    <Layout>
      <Head>
        <title>Product Page</title>
      </Head>
      <div css={productDetailsWrapper}>
        <h1>{props.singleProduct.name}</h1>
        <div css={productContent}>
          <div css={productContentImage}>
            <Image
              src={`/images/${props.singleProduct.nationality}.jpeg`}
              width={500}
              height={500}
              alt={props.singleProduct.name}
            />
          </div>
          <div css={productContentText}>
            <h3>
              {props.singleProduct.name} by {props.singleProduct.brand}
            </h3>
            {props.singleProduct.description}
            <p>{props.singleProduct.price / 100}€</p>
            <div css={countDiv}>
              <button
                css={countButton}
                onClick={() => {
                  const subtractedValue = subtractItemByProductId(
                    props.singleProduct.id,
                  );
                  setItemCount(props.singleProduct.itemCount);
                  setCart(subtractedValue);
                }}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
              </button>
              {itemCount}
              <button
                css={countButton}
                onClick={() => {
                  // this updates the cookie state
                  setCart(addItemByProductId(props.singleProduct.id));
                  setItemCount(props.singleProduct.itemCount);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </div>
            <button
              data-cy="item-inCart"
              css={cartButton}
              onClick={addToCartHandler}
            >
              ADD TO CART <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { getProduct } = await import('../../util/database');

  const singleProduct = await getProduct(context.query.productId);

  return {
    props: { singleProduct },
  };
};
