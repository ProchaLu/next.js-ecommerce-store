import Image from 'next/image';
import { useState } from 'react';
import Layout from '../components/Layout';
import { calcTotalCount, calcTotalSum } from '../util/functions';

export default function Cart(props) {
  const [shoppingCart, setShoppingCart] = useState(props.cartArray);

  const totalSum = calcTotalSum(shoppingCart);
  const totalCount = calcTotalCount(shoppingCart);

  return (
    <Layout>
      {shoppingCart.map((product) => {
        return (
          <div key={`product-li-${product.id}`}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.brand}</p>
              <div>
                <Image
                  src={`/../public/images/${product.nationality}.jpeg`}
                  width={100}
                  height={100}
                  alt={product.name}
                />
              </div>
              <div>Items: {product.itemCount}</div>
              <div> Price: {product.price}€</div>
            </div>
          </div>
        );
      })}
      <div>TOTAL ITEMS: {totalCount}</div>
      <div>TOTAL PRICE: {totalSum}€</div>
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
