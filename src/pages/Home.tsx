import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <div className="container">
      <div>home</div>
      <Link to="/products" state={{ category: "Sport sneakers" }}>
        Sport Sneakers
      </Link>
      <Link to="/products" state={{ category: "Custom sneakers" }}>
        Custom Sneakers
      </Link>
      <Link to="/products" state={{ category: "Street sneakers" }}>
        strrt Sneakersssss
      </Link>
    </div>
  );
};

export default Home;
