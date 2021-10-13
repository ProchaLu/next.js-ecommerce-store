import { css } from '@emotion/react';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

export default function Products(props) {
  const content = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 2rem;

    a {
      display: block;
      text-align: center;
      text-decoration: none;
      color: #000;
      padding: 10px;
    }

    button {
      font-size: 20px;
      margin: 4px;
      border: none;
      cursor: pointer;
      background-color: transparent;
    }
  `;

  const contentWrapper = css`
    margin: 0 auto;
    padding: 20px 20px;
    text-align: center;
  `;

  const addToCartHandler = (id) => {
    if (props.products.itemStock < 1) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    const currentCookie = getParsedCookie('cart') || [];

    const isItemInCart = currentCookie.some((cookieObject) => {
      return cookieObject.id === id; // id that comes from the URL
    });
    let newCookie;
    if (isItemInCart) {
      newCookie = currentCookie.filter(
        (cookieObject) => cookieObject.itemCount + 1,
      );
    } else {
      // add the new product
      newCookie = [...currentCookie, { id: id, itemCount: 1 }];
    }
    setParsedCookie('cart', newCookie);
  };
  return (
    <Layout>
      <div css={contentWrapper}>
        <div css={content}>
          {props.products.map((product) => {
            return (
              <div key={`product-li-${product.id}`}>
                <div>
                  <Link href={`/products/${product.id}`}>
                    <a data-cy="singleProduct-Link">
                      <h3>{product.name}</h3>
                      <div>
                        <Image
                          src={`/../public/images/${product.nationality}.jpeg`}
                          width={300}
                          height={300}
                          alt={product.name}
                        />
                      </div>
                    </a>
                  </Link>
                  <div> Price: {product.price / 100}€</div>
                  <button onClick={() => addToCartHandler(product.id)}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { getProducts } = await import('../../util/database');

  const products = await getProducts();

  return {
    props: { products },
  };
};
