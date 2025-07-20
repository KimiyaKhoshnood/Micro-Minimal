import ReactDOM from "react-dom/client";
import NewestBooking from "components/NewestBooking";
import Upload from "components/Upload";
import Table from "components/Table";
import ProductsView from "components/ProductsView";
import ProductView from "components/ProductView";
import CheckoutView from "components/CheckoutView";

import "./index.css";
import { Products } from "./ProductsData";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Checkout } from "./CheckoutData";
import { useEffect, useState } from "react";

const App = () => {
  const [checkoutProducts, setCheckoutProducts] = useState(() => {
    const saved = localStorage.getItem("checkout");
    return saved ? JSON.parse(saved) : Checkout;
  });

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkoutProducts));
  }, [checkoutProducts]);

  const handleCheckoutProducts = (data: any) => setCheckoutProducts(data)

  return <div className="py-10 text-3xl mx-auto max-w-6xl flex flex-col gap-5">
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<ProductsView products={Products} handleCheckout={handleCheckoutProducts} checkoutProducts={checkoutProducts} />} />
        <Route path="/shop/:slug" element={<ProductViewComponent handleCheckoutProducts={handleCheckoutProducts} checkoutProducts={checkoutProducts} />} />
        <Route path="/shop/checkout" element={<CheckoutView checkout={checkoutProducts} handleCheckout={handleCheckoutProducts} />} />
        <Route path="/" element={<>
          {/* <ProductsView products={Products} /> */}
          <div>Name: application</div>
          <div>Framework: react-19</div>
          <div className="grid grid-cols-4">
            <NewestBooking item={{
              guests: '3-5',
              id: 1,
              bookedAt: Date(),
              duration: '3 days 2 nights',
              isHot: true,
              name: 'Jayvion Simon',
              price: 83.74,
              avatarUrl: '',
              coverUrl: '',
            }} />
          </div>
          <Upload />
          <Table />
        </>} />
      </Routes>
    </BrowserRouter>
  </div>
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);


export const ProductViewComponent = ({ handleCheckoutProducts, checkoutProducts }: { handleCheckoutProducts: (data: any) => void, checkoutProducts: { [key: string]: any } }) => {
  const { slug } = useParams()
  const Product = Products.filter(product => product.name == slug)[0];

  return <ProductView product={Product} handleCheckout={handleCheckoutProducts} checkoutProducts={checkoutProducts} />
}