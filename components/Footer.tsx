import { css } from '@emotion/react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import LogoWhite from '../public/logo/logo_white_large.png';

const Footer = () => {
  const footerWrapper = css`
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    background: var(--clr-blue);
  `;

  const footerContent = css`
    padding: 36px 0px;
    text-align: center;
    color: white;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
  `;
  const footerRow = css`
    span {
      display: block;
      color: #bcbcbc;
      font-size: 16px;
      margin-top: 48px;
      position: relative;
      font-weight: 300;
    }

    a {
      color: white;
      text-decoration: none;
      font-weight: 700;
    }
  `;
  const footerNavItems = css`
    h5 {
      text-align: left;
      font-size: 16px;
      margin-bottom: 8px;
    }

    ul {
      padding: 0;
    }

    li {
      text-align: left;
      text-decoration: none;
      list-style: none;
    }

    a {
      display: block;
      margin-bottom: 6px;
      padding-left: 0;
      margin-left: 0;
      font-size: 14px;
      font-weight: 300;
      color: white;
      padding-bottom: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  `;
  const socialIcons = css`
    text-align: center;
    padding: 10px;

    a {
      color: white;
      text-decoration: none;
    }

    span {
      color: white;
      margin: 20px;
      font-size: 28px;
    }
  `;

  return (
    <div css={footerWrapper}>
      <div css={footerContent}>
        <div css={footerRow}>
          <Image src={LogoWhite} alt="LogoWhite" />
          <span>
            Email us:
            <a href="mailto:prochazka.lu@gmail.com">e-mail@me</a>
          </span>
        </div>
        <div css={footerRow}>
          <div css={footerNavItems}>
            <h5>Help</h5>
            <ul>
              <li>
                <Link href="/">
                  <a>FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Customer Service</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Online Events</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div css={footerRow}>
          <div css={footerNavItems}>
            <h5>About Us</h5>
            <ul>
              <li>
                <Link href="/">
                  <a>Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Our Story</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div css={footerRow}>
          <div css={footerNavItems}>
            <h5>POLICY</h5>
            <ul>
              <li>
                <Link href="/">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>User Agreement</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Community Guidelines</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Cookie Notice</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Securty Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div css={socialIcons}>
        <span>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </Link>
        </span>
        <span>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Link>
        </span>
        <span>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </Link>
        </span>
        <span>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
