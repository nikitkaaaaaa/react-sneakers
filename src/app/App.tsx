import React from "react";
import { Route, Routes } from "react-router-dom";

import "../style/global.css";
import Header from "../componets/header/Header";
import { routes } from "../routes/routes";
import Products from "../pages/Products";
import Product from "../pages/Product";

const App = () => {
  return (
    <>
      <Header />
      <hr />
      <div>
        <Routes>
          <Route path={routes.products} element={<Products />}></Route>
          <Route path={routes.product} element={<Product />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
