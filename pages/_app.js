import '@fortawesome/fontawesome-svg-core/styles.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getCookies, getParsedCookie, setCookies } from '../util/cookies';

export default function MyApp({ Component, pageProps }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart(getParsedCookie('cart'));
  }, []);

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0 auto;
          }
          body {
            font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          }
        `}
      />
      <Head>
        <title>Football Jersey Shop</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          lang="en"
        />
      </Head>
      <Component
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        {...pageProps}
      />
    </>
  );
}
