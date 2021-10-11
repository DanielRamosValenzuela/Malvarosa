import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { commerce } from "../components/lib/commerce";

import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { HomeScreen } from "../components/screens/HomeScreen";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const AppRouter = () => {
  const [products, setProducts] = useState([]);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddTocart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  console.log(cart);

  return (
    <div>
      <Router>
        <header className="row">
          <Navbar toggleSidebar={toggleSidebar} totalItems={cart.total_items} />
          <Sidebar
            isOpenSidebar={isOpenSidebar}
            toggleSidebar={toggleSidebar}
          />
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <HomeScreen products={products} onAddToCart={handleAddTocart} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        <footer className="row center">
          <Footer />
        </footer>
      </Router>
    </div>
  );
};
