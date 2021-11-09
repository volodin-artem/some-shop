import React, {useEffect, useRef, useState} from 'react';
import NavMenu from "../../components/nav-menu/NavMenu.jsx";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./product-catalog.sass";
import ProductRow from "../../components/input/product-row/ProductRow.jsx";
import fetchJSON from "../../fetchJSON.js";
import * as ReactDOM from "react-dom";
import NotFoundPage from "../not-found/NotFoundPage.jsx";
import {useHistory} from "react-router";

function ProductCatalog(props) {
  const [products, setProducts] = useState([]);
  const [header, setHeader] = useState("");
  const history = useHistory();
  useEffect(
    async () => {
      const json = await fetchJSON(props.location.pathname);
      if(Object.keys(json).length > 0 && !json[0].flag){
        setProducts(json.map(( response, index) => {
          if(!response.flag) return <ProductRow product={response} key={index} />;
          const header = response.flag;
          setHeader(header);
          document.title = `${header} | Some shop`;
        }));
      }
      else history.push("/not-found");
      }
  , []);

    return (
      <div>
        <Header />
        <NavMenu />
        <div className="content product-header" style={{padding: "20px 0 0 0"}}>
          {header}
        </div>
        <div className="product-catalog content">
          {
            products
          }
        </div>
        <Footer />
      </div>
    );
}

export default ProductCatalog;
