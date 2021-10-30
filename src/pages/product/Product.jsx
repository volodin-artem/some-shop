import React, {useEffect, useState} from 'react';
import Header from "../../header/Header.jsx";
import NavMenu from "../../nav-menu/NavMenu.jsx";
import "./product-page.sass";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as ReactDOM from "react-dom";
import NotFound from "../not-found/NotFound.jsx";
import HoverToolTip from "../../input/tooltip/HoverToolTip.jsx";
import Footer from "../../footer/Footer.jsx";
import fetchJSON from "../../fetchJSON.js";
import BuyLayout from "../../input/BuyLayout.jsx";
import Star from "../../input/Star.jsx";
import StarRating from "../../input/StarRating.jsx";

function Product(props){
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [brand, setBrand] = useState({});
  const [user, setUser] = useState({});

  useEffect( () => {
    fetchJSON(props.location.pathname, (result) =>{
      setProduct(result);
      setMainImage(result.imagePath.split(';')[0]);
      fetchJSON(`/set-product-view?productId=${result.id}&views=${++result.viewsCount}`);
      fetchJSON(`/get-user?token=${localStorage.getItem('token')}`, (user) => {
        if(!user || !result) return;
        setUser(user.user);
        fetchJSON(`/append-view-to-history?userId=${user.user.id}&productId=${result.id}`);
      });
    });
    fetchJSON(`/brands?id=${props.match.params.id}`, (result) =>
    {
      setBrand(result);
    });
  },[product.id]);

  function onMiniatureMouseOver(e, imagePath, index){
    const bigImage = product.imagePath.split(';')[index];
    setMainImage(bigImage);
  }
  useEffect( () => {
      if (product.name) document.title = product.name;
    }
  )
    let miniatures = product.miniatures;
    if(miniatures){
      miniatures = miniatures.split(';').map( (item, index) => {
        return (
          <div className="image-miniatures__image" key={index}>
            <img src={item} onMouseOver={(e) => onMiniatureMouseOver(e, e.target.src, index)} />
          </div>);
      } );
    }
    return (
      <div>
        <Header />
        <NavMenu />
        <div className="content product">
          <div className="product-header">
            {product.name}
          </div>
          <div className="product__title">
            <div className="title__image-miniatures">
              {
                miniatures
              }
            </div>
            <div className="title__main-image">
              <img src={mainImage} />
            </div>
            <div className="title__top">
              <span className="top__text">{"12400 dpi, светодиодный, USB, кнопки - 6 подробнее"}</span>
              <BuyLayout price={product.price} />
              <div className="top__stars">
                <StarRating product={product} />
              </div>
            </div>
            <div className="right-logo">
              <a className="right-logo__logo" href={"/products/" + product.id + "/brand/" + brand.id}>
                <img src={brand.imagePath} height="100%" width="100px" data-tooltip={"Перейти на страницу " + brand.name} alt={brand.name}/>
              </a>
            </div>
          </div>
          <div className="product__middle">
            <p className="middle__header">
              {"Описание " + product.name}
            </p>
            {product.description}
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Product;
