import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Thankyou() {
  const orderSite = css`
    font-size: 40px;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 100px;
    align-items: center;

    p {
      font-size: 24px;
    }
  `;

  const backButton = css`
    font-size: 24px;
    cursor: pointer;
    margin: 12px;
  `;

  const router = useRouter();

  const onClickBackToProducts = () => {
    router.push('/products');
  };
  return (
    <Layout>
      <div css={orderSite}>
        <div>THANKS FOR YOUR ORDER</div>
        <p>
          You will receive an Email with your order confirmation and your
          invoice
        </p>
        <button onClick={onClickBackToProducts} css={backButton}>
          BACK TO PRODUCTS
        </button>
      </div>
    </Layout>
  );
}
