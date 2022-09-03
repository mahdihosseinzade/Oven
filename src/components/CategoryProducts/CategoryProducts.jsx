import React, { useEffect, useRef } from "react";

import ProductCard from "../ProductCard/ProductCard";

import "./CategoryProducts.scss";

const CategoryProducts = ({ category }, ref) => {
  return (
    <section className="CategoryProducts d-flex flex-column" name={category.id}>
      <header>
        <h2 className="CategoryProducts-title">{category.name}</h2>
      </header>

      <section className="CategoryProducts-product-list d-flex flex-wrap justify-content-center">
        {category.products.map((product) => {
          return (
            <ProductCard
              className="CategoryProducts-product"
              key={product.id}
              product={product}
            />
          );
        })}
      </section>
    </section>
  );
};

export default CategoryProducts;
