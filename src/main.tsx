import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider, useCart } from "./cart";
import { Header, Footer } from "./components";
import { getPage } from "./content";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Events from "./pages/Events";
import Team from "./pages/Team";
import "./styles.css";
function App() {
  const page = getPage();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  const { notice } = useCart();
  const content = {
    home: <Home />,
    about: <About />,
    products: <Products />,
    cart: <Cart />,
    events: <Events />,
    team: <Team />,
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main">{content[page]}</main>
      <Footer />
      <div
        role="status"
        aria-label="Cart update"
        aria-live="polite"
        className={notice ? "toast" : "sr-only"}
      >
        {notice}
        {notice && <a href="./cart.html">View cart →</a>}
      </div>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
