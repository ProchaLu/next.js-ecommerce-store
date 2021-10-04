import { css } from '@emotion/react';
import Image from 'next/image';
import new4 from '../public/images/belgium.jpeg';
import new3 from '../public/images/brasil.jpeg';
import new1 from '../public/images/colombia.jpeg';
import new5 from '../public/images/germany.jpeg';
import new2 from '../public/images/nigeria.jpeg';

export default function Feature() {
  const featureWrapper = css`
    margin: 20px;

    h1 {
      margin: 20px;
    }

    p {
      margin: 20px;
    }
  `;
  const featureContent = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  `;

  return (
    <div css={featureWrapper}>
      <h1>OUR NEW ARRIVALS</h1>
      <p>Check out our new arrivals down below</p>
      <div css={featureContent}>
        <Image src={new1} alt="new arrival " />
        <Image src={new2} alt="new arrival " />
        <Image src={new3} alt="new arrival " />
        <Image src={new4} alt="new arrival " />
        <Image src={new5} alt="new arrival " />
      </div>
    </div>
  );
}
