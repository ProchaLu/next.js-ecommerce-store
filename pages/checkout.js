import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { setParsedCookie } from '../util/cookies';
import { calcTotalCount, calcTotalSum } from '../util/functions';

const checkoutWrapper = css`
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 90vw;
  align-items: center;
`;

const checkoutItems = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 10px;
`;

const checkoutItemColumn = css`
  line-height: 20px;
  padding: 4px;
  align-items: flex-start;
`;

const paymentDiv = css`
  position: relative;
  align-items: center;
  text-align: center;
`;

const paymentButton = css`
  font-size: 24px;
  cursor: pointer;
  width: 90vw;
  margin-bottom: 50px;
`;

const totalCart = css`
  font-size: 32px;
  line-height: 50px;
  font-weight: bold;
`;

const contactDiv = css`
  display: inline-block;
  width: 100%;
`;

const inputDiv = css`
  font-size: 20px;

  h2 {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  input {
    width: 90%;
    margin: 8px;
    height: 32px;
    font-size: 16px;
  }
`;

const divError = css`
  color: #ff4136;
  font-size: 16px;
`;

const smallInfo = css`
  font-size: 12px;
`;

export default function Checkout(props) {
  const router = useRouter();

  const [finalCartArray, setFinalCartArray] = useState(props.cartArray);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  // credit card validation

  /*   const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastPattern = /^(?:5[1-5][0-9]{14})$/;
  const amexPattern = /^(?:3[47][0-9]{13})$/;
  const discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; */

  const findFormErrors = () => {
    const {
      firstname,
      lastname,
      mail,
      address,
      country,
      zip,
      city,
      creditcardholder,
      creditcardnumber,
      creditcardexpirydate,
      creditcardcvv,
    } = form;
    const newErrors = {};
    // first name errors
    if (!firstname || firstname === '') {
      newErrors.firstname = 'please enter your first name!';
    } else if (firstname.length > 40) {
      newErrors.firstname = 'first name is too long!';
    }
    // last name errors
    if (!lastname || lastname === '') {
      newErrors.lastname = 'please enter your last name!';
    } else if (lastname.length > 40) {
      newErrors.lastname = 'last name is too long!';
    }
    // email errors
    if (!mail || mail === '') {
      newErrors.mail = 'please enter your Email!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      newErrors.mail = 'please enter a valid Email address!';
    }
    // address errors
    if (!address || address === '') {
      newErrors.address = 'please enter your address!';
    } else if (address.length > 100) {
      newErrors.address = 'the address is too long!';
    } else if (!/\d/.test(address)) {
      newErrors.address = 'the address has no number!';
    }
    // zip code errors
    if (!zip || zip.length > 5 || zip.length < 4) {
      newErrors.zip = 'please enter a valid ZIP Code!';
    }
    // city errors
    if (!city || city === '') {
      newErrors.city = 'please enter a city!';
    }
    // country errors
    if (!country || country === '') {
      newErrors.country = 'please enter a country!';
    }
    // credit card holder errors
    if (!creditcardholder || creditcardholder.length > 40) {
      newErrors.creditcardholder = 'please enter a credit card holder!';
    }
    // credit card numbers errors, and validation regex
    /*    if (!visaPattern.test(creditcardnumber) ||
      !mastPattern.test(creditcardnumber) ||
      !amexPattern.test(creditcardnumber) ||
      !discPattern.test(creditcardnumber)
    ) */
    if (!creditcardnumber || creditcardnumber.length !== 16) {
      newErrors.creditcardnumber = 'please enter a valid credit card number!';
    }
    // credit card expiry date
    if (
      !creditcardexpirydate ||
      creditcardexpirydate.length !== 5 ||
      !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(creditcardexpirydate)
    ) {
      newErrors.creditcardexpirydate =
        'please enter a expiry date in the format of MM/YY!';
    }
    // CCV validation
    if (!creditcardcvv || creditcardcvv.length !== 3) {
      newErrors.creditcardcvv = 'Please enter a valid CVV!';
    }
    return newErrors;
  };

  const totalSum = calcTotalSum(finalCartArray);
  const totalCount = calcTotalCount(finalCartArray);

  if (totalCount < 0) {
    setFinalCartArray([]);
    setParsedCookie('cart', []);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      router.push('/thankyou');
      setParsedCookie('cart', []);
    }
  };

  return (
    <Layout>
      <div css={checkoutWrapper}>
        <div css={contactDiv}>
          <div css={inputDiv}>
            <h2>Contact Info</h2>
            {/* first name */}
            <div htmlFor="firstname">
              First Name <span css={divError}>{errors.firstname}</span>
            </div>
            <input
              id="firstname"
              placeholder="Max"
              onChange={(e) => setField('firstname', e.target.value)}
              isInvalid={!!errors.firstname}
            />
            {/* last name */}
            <div htmlFor="lastname">
              Last Name <span css={divError}>{errors.lastname}</span>
            </div>
            <input
              id="lastname"
              placeholder="Mustermann"
              onChange={(e) => setField('lastname', e.target.value)}
              isInvalid={!!errors.lastname}
            />
            {/* mail */}
            <div>
              Mail <span css={divError}>{errors.mail}</span>
            </div>
            <input
              type="mail"
              id="mail"
              placeholder="max.mustermann@mail.com"
              onChange={(e) => setField('mail', e.target.value)}
              isInvalid={!!errors.mail}
            />
            {/* phone number */}
            <div>
              Phone Number <span css={smallInfo}>(Optional)</span>
            </div>
            <input
              type="number"
              id="phonenumber"
              placeholder="0676 123 45 67"
            />
            <hr />
          </div>
          <div css={inputDiv}>
            <h2>Shipping Info</h2>
            {/* address */}
            <div>
              Address <span css={divError}>{errors.address}</span>
            </div>
            <input
              id="address"
              placeholder="Street 1"
              onChange={(e) => setField('address', e.target.value)}
              isInvalid={!!errors.address}
            />
            {/* ZIP code */}
            <div>
              Zip Code <span css={divError}>{errors.zip}</span>
            </div>
            <input
              type="number"
              id="zipcode"
              placeholder="1010"
              onChange={(e) => setField('zip', e.target.value)}
              isInvalid={!!errors.zip}
            />
            {/* city */}
            <div>
              City <span css={divError}>{errors.city}</span>
            </div>
            <input
              id="city"
              placeholder="Vienna"
              onChange={(e) => setField('city', e.target.value)}
              isInvalid={!!errors.city}
            />
            {/* country */}
            <div>
              Country <span css={divError}>{errors.country}</span>
            </div>
            <input
              id="state"
              placeholder="Austria"
              onChange={(e) => setField('country', e.target.value)}
              isInvalid={!!errors.country}
            />
          </div>
          <hr />
          <div css={inputDiv}>
            <h2>Credit Card Info</h2>
            {/* card holder */}
            <div>
              Credit Card Holder{' '}
              <span css={divError}>{errors.creditcardholder}</span>
            </div>
            <input
              id="creditcardholder"
              placeholder="Max Mustermann"
              onChange={(e) => setField('creditcardholder', e.target.value)}
              isInvalid={!!errors.creditcardholder}
            />
            {/* card number */}
            <div>
              Number <span css={divError}>{errors.creditcardnumber}</span>
            </div>
            <input
              type="number"
              id="creditcardnumber"
              placeholder="4024007103939509"
              onChange={(e) => setField('creditcardnumber', e.target.value)}
              isInvalid={!!errors.creditcardnumber}
            />
            {/* expire date */}
            <div>
              Expire Date{' '}
              <span css={divError}>{errors.creditcardexpirydate}</span>
            </div>
            <input
              id="creditcardexpirydate"
              placeholder="MM/YY"
              onChange={(e) => setField('creditcardexpirydate', e.target.value)}
              isInvalid={!!errors.creditcardexpirydate}
            />
            {/* CCV */}
            <div>
              CCV <span css={divError}>{errors.creditcardcvv}</span>
            </div>
            <input
              id="cvv"
              placeholder="123"
              onChange={(e) => setField('creditcardcvv', e.target.value)}
              isInvalid={!!errors.creditcardcvv}
            />
          </div>
        </div>
        <div>
          {finalCartArray.map((product) => {
            return (
              <div css={checkoutItems} key={`product-li-${product.id}`}>
                <div css={checkoutItemColumn}>
                  <Image
                    src={`/../public/images/${product.nationality}.jpeg`}
                    width={75}
                    height={75}
                    alt={product.name}
                  />
                </div>
                <div css={checkoutItemColumn}>
                  <h4>
                    {product.itemCount} x {product.name}
                  </h4>
                  <p>by {product.brand}</p>
                </div>
                <div css={checkoutItemColumn}>
                  <h4>{product.itemCount * (product.price / 100)}€</h4>
                </div>
              </div>
            );
          })}
          <hr />
          <div css={totalCart}>
            <div>Total Items: {totalCount}</div>
            <div>Total Price: {totalSum}€</div>
          </div>
        </div>
      </div>
      <div css={paymentDiv}>
        <button css={paymentButton} onClick={(e) => handleSubmit(e)}>
          Pay {totalSum}€
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { getProducts } = await import('../util/database');

  const products = await getProducts();

  const rawCookie = context.req.cookies.cart;
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  const cartArray = cookieArray.map((p) => {
    const cartObject = products.find((prod) => prod.id === p.id);
    return {
      id: cartObject.id,
      name: cartObject.name,
      price: cartObject.price,
      itemCount: p.itemCount,
      nationality: cartObject.nationality,
      brand: cartObject.brand,
    };
  });

  return {
    props: { products, cartArray },
  };
};
