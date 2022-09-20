import '@fortawesome/fontawesome-svg-core/styles.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          :root {
            --clr-blue: #0074d9;
          }

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
        <title>Football Jersey Store</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          lang="en"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
