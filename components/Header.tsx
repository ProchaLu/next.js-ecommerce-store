import { css } from '@emotion/react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/logo/logo_large.png';
import { getParsedCookie } from '../util/cookies';
import { calcTotalCount } from '../util/functions';

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
  font-size: 22px;

  a {
    color: #000;
  }
`;

const cart = css`
  margin-top: 100px;
`;

const navBar = css`
  text-transform: uppercase;
  font-size: 20px;
  color: #0074d9;

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    list-style: none;
    display: inline-block;
    text-align: center;
    padding: 10px;
    color: var(--clr-blue);

    &:hover {
      background-color: var(--clr-blue);
      border-radius: 10px;
      color: #fff;
    }
  }
`;
const Header = () => {
  // count the items in cart
  const cartCount = () => {
    try {
      return getParsedCookie('cart');
    } catch (err) {
      return;
    }
  };
  const cartItems = cartCount();

  const totalItemsInCart =
    typeof cartItems === 'undefined' ? 0 : calcTotalCount(cartCount());

  return (
    <div>
      <div css={navWrapper}>
        <div css={headerLogo}>
          <Link href="/">
            <a data-cy="header-landingPage-link">
              <Image src={Logo} alt="Logo" />
            </a>
          </Link>
        </div>
        <div css={headerCart}>
          <div css={cart}>
            <p>{totalItemsInCart}</p>
            <Link href="/cart/">
              <a>
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div css={navBar}>
        <ul>
          <Link href="/products/">
            <a data-cy="header-allProducts-link">
              <li>All Jerseys</li>
            </a>
          </Link>
          <li>WM Jerseys</li>
          <li>EM Jerseys</li>
          <li>COPA AMERICA Jerseys</li>
          <li>Retro Jerseys</li>
          <Link href="/cart/">
            <a data-cy="header-cart-link">
              <li>CART</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
