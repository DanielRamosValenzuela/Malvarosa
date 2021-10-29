import React, { useState, useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { CssBaseline } from "@mui/material";

import { commerce } from "../components/lib/commerce";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { HomeScreen } from "../components/screens/HomeScreen";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Cart } from "../components/screens/Cart";
import { Checkout } from "../components/screens/CheckoutForm/Checkout/Checkout";
import History from "../components/lib/History";
import { Loading } from "../components/lib/Loading";

export const AppRouter = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [cart, setCart] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoriesInput, setCategoriesInput] = useState("");
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState(0);
  const [orderBy, setOrderBy] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [page, setPage] = useState(0);

  let history = History;

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const fetchCategories = async () => {
    setCategories(await commerce.categories.list());
  };

  const handleAddTocart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);

    Toast.fire({
      icon: "success",
      title: "Añadido al carro",
    });
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);

    Toast.fire({
      icon: "success",
      title: "Producto eliminado",
    });
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
    Toast.fire({
      icon: "success",
      title: "El carro ha sido vaciado",
    });
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPagination(1);
    setPage(0);

    setCaseFilter(1);
    setSearch(e.target.value);
    setCategoriesInput("");
    setOrderBy(0);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPagination(1);
    setPage(0);
    setCaseFilter(0);
    setSearch("");
    setCategoriesInput("");
    setOrderBy(0);
  };

  const onClickCategorie = (e) => {
    e.preventDefault();
    setPagination(1);
    setPage(0);
    setCaseFilter(2);
    setCategoriesInput(e.target.value);
    setSearch("");
    if (isOpenSidebar === true) {
      toggleSidebar();
    }
    if (history.location.pathname !== "/") {
      History.push("/");
    }
  };

  const handleResetCategorie = (e) => {
    e.preventDefault();
    setPagination(1);
    setPage(0);
    setCaseFilter(0);
    setCategoriesInput("");
    setSearch("");
    setOrderBy(0);
    if (isOpenSidebar === true) {
      toggleSidebar();
    }
    if (history.location.pathname !== "/") {
      History.push("/");
    }
  };

  const handleChangeOrderBy = (e) => {
    e.preventDefault();
    setPagination(1);
    setPage(0);
    setOrderBy(e.target.value);
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  useEffect(() => {
    fetchProducts();
    setCaseFilter(0);
    fetchCart();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (caseFilter === undefined) return;

    switch (caseFilter) {
      case 0:
        setFilterProducts(products);
        break;
      case 1:
        setFilterProducts(
          products.filter((product) => {
            return product.name.toLowerCase().includes(search.toLowerCase());
          })
        );
        break;

      case 2:
        let arr = [];
        products.map((product) => {
          product.categories.map((cat) => {
            if (cat.name === categoriesInput) {
              arr = [...arr, product];
              return 0;
            }
            return 0;
          });
          return 0;
        });
        setFilterProducts(arr);

        break;

      default:
        <Loading />;
        break;
    }
  }, [caseFilter, search, categoriesInput, products]);

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return <Loading />; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }

  return (
    !!products &&
    products.length > 0 && (
      <div>
        <CssBaseline />
        <Router history={History}>
          <header>
            <Navbar
              toggleSidebar={toggleSidebar}
              totalItems={cart.total_items}
              categories={categories}
              handleReset={handleReset}
              handleChange={handleChange}
              search={search}
              handleResetCategorie={handleResetCategorie}
              onClickCategorie={onClickCategorie}
              isOpenSidebar={isOpenSidebar}
            />
            <Sidebar
              isOpenSidebar={isOpenSidebar}
              toggleSidebar={toggleSidebar}
              categories={categories}
              handleReset={handleReset}
              handleChange={handleChange}
              search={search}
              handleResetCategorie={handleResetCategorie}
              onClickCategorie={onClickCategorie}
            />
          </header>
          <main>
            <Switch>
              <Route path="/" exact>
                <HomeScreen
                  filterProducts={filterProducts}
                  onAddToCart={handleAddTocart}
                  search={search}
                  categoriesInput={categoriesInput}
                  caseFilter={caseFilter}
                  orderBy={orderBy}
                  handleChangeOrderBy={handleChangeOrderBy}
                  pagination={pagination}
                  setPagination={setPagination}
                  page={page}
                  setPage={setPage}
                />
              </Route>
              <Route path="/carro" exact>
                <Cart
                  cart={cart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              </Route>
              <Route path="/checkout" exact>
                <Checkout
                  cart={cart}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                  order={order}
                />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
          <footer className="row center">
            <Footer />
          </footer>
        </Router>
      </div>
    )
  );
};
