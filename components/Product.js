/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <div>
        <Link href={`/product/${slug.current}`}>
          <div className="product-card">
            <img
              src={urlFor(image && image[0])}
              width={230}
              height={230}
              style={{ objectFit: 'cover' }}
              className="product-image"
              alt="img"
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
