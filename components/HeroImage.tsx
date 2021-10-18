import { css } from '@emotion/react';

const imageWrapper = css`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url('https://www.coca-cola-oesterreich.at/content/dam/one/at/de/lead/get-active/sport/der-fifa-wm-pokal-die-trophaee-hero.jpg'),
    black;
  background-size: 100%, cover;
  background-position: center;
  height: 600px;
  position: relative;
  animation: animationHeroImage 1s;
  background-size: 100%, cover;
  background-position: center;
  position: relative;
  animation: animationHeroImage 1s;

  @keyframes animationHeroImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const heroContent = css`
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
`;

const heroText = css`
  z-index: 100;
  max-width: 700px;
  position: absolute;
  bottom: 40px;
  margin-right: 20px;
  min-height: 100px;
  color: white;

  h1 {
    font-size: 32px;
    padding-bottom: 16px;
  }
`;

export default function HeroImage() {
  return (
    <div css={imageWrapper}>
      <div css={heroContent}>
        <div css={heroText}>
          <h1>Buy the new WM Qualification Jerseys</h1>
          <p>Stay up do Date with the new WM Qualification Jerseys. </p>
        </div>
      </div>
    </div>
  );
}
