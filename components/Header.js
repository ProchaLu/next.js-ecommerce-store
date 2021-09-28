import { css } from '@emotion/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/logo/logo_large.png';

const Header = () => {
  const navWrapper = css`
    margin-bottom: 10px;
    display: flex;
    overflow: auto;
    height: 150px;
  `;
  const headerLogo = css`
    width: 70vw;
  `;
  const headerCart = css`
    font-size: 32px;

    a {
      color: #000;
    }
  `;

  const cart = css`
    margin-top: 100px;
  `;

  return (
    <div css={navWrapper}>
      <div css={headerLogo}>
        <Link href="/">
          <a>
            <Image src={Logo} alt="Logo" />
          </a>
        </Link>
      </div>
      <div css={headerCart}>
        <div css={cart}>
          <span>Items in Cart: 0</span>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
