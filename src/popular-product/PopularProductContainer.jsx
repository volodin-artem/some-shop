import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Product from "../product/Product.jsx";
import fetchJSON from "../fetchJSON.js";
import configuration from "../configuration.js";
import NotFound from "../pages/not-found/NotFound.jsx";

function PopularProductContainer() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const json = await fetchJSON("/popular-products");
      setProducts(json);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <p className="container-label content">Популярные товары</p>
      <div className="content popular-product-container">
        {products.map( (product, index) => <Product imgSrc={product.imagePath} price={product.price} desc={product.name} key={index} id={product.id} /> )}
      </div>
    </div>
  );
}

export default PopularProductContainer;
