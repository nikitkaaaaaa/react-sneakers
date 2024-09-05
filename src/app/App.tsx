import React from "react";
import { Route, Routes } from "react-router-dom";

import "../style/global.css";
import logo from "../icons/logo.svg";
import Header from "../componets/header/Header";
import { routes } from "../routes/routes";
import Products from "../pages/Products";

const App = () => {
  return (
    <>
      <Header />
      <hr />
      <div className="container">
        <Routes>
          <Route path={routes.products} element={<Products />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
