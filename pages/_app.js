import { css, Global } from '@emotion/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
