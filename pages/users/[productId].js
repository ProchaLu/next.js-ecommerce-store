import { css } from '@emotion/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';

export default function Products(props) {
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

    button {
      font-size: 24px;
      cursor: pointer;
      margin: 12px;
      width: 90%;
    }
  `;

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
              src={props.singleProduct.image}
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
            <p>{props.singleProduct.price}€</p>

            <button>
              ADD TO CART <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { products } = await import('../../util/database');

  const idFromUrl = context.query.productId;

  const singleProduct = products.find((product) => {
    return idFromUrl === product.id;
  });

  return {
    props: { singleProduct },
  };
};
