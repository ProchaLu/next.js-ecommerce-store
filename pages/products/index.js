import { css } from '@emotion/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';

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

  return (
    <Layout>
      <div css={contentWrapper}>
        <div css={content}>
          {props.products.map((product) => {
            return (
              <div key={`product-li-${product.id}`}>
                <div>
                  <Link href={`/products/${product.id}`}>
                    <a>
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
                  <button>
                    <FontAwesomeIcon icon={faShoppingCart} />
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
