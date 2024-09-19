import React from "react";
import { Route, Routes } from "react-router-dom";

import "../style/global.css";
import Header from "../componets/header/Header";
import { routes } from "../routes/routes";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Footer from "../componets/footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <hr />
      <div>
        <Routes>
          <Route path={routes.home} element={<Home />}></Route>
          <Route path={routes.products} element={<Products />}></Route>
          <Route path={routes.product} element={<Product />}></Route>
          <Route path={routes.cart} element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
