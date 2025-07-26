import ReactDOM from "react-dom/client";
import NewestBooking from "components/NewestBooking";
import Upload from "components/Upload";
import Table from "components/Table";
import ProductsView from "components/ProductsView";
import ProductView from "components/ProductView";
import CheckoutView from "components/CheckoutView";
import DashboardLayoutView from "components/DashboardLayoutView";
import ShopDashboardListView from "components/ShopDashboardListView";
import ShopDashboardDetailsView from "components/ShopDashboardDetailsView";
import ShopDashboardCreateView from "components/ShopDashboardCreateView";
import ShopDashboardEditView from "components/ShopDashboardEditView";
import OrderDashboardListView from "components/OrderDashboardListView";
import OrderDashboardDetailsView from "components/OrderDashboardDetailsView";
import CalendarDashboardView from "components/CalendarDashboardView";
import AnalyticsDashboardView from "components/AnalyticsDashboardView";
import BankingDashboardView from "components/BankingDashboardView";
import MailDashboardView from "components/MailDashboardView";

import "./index.css";
import { Products } from "./ProductsData";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Checkout } from "./CheckoutData";
import { useEffect, useState } from "react";
import { OrderDate } from "./order-data";

const App = () => {
  const [checkoutProducts, setCheckoutProducts] = useState(() => {
    const saved = localStorage.getItem("checkout");
    return saved ? JSON.parse(saved) : Checkout;
  });

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkoutProducts));
  }, [checkoutProducts]);

  const handleCheckoutProducts = (data: any) => setCheckoutProducts(data)

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<ProductsView products={Products} handleCheckout={handleCheckoutProducts} checkoutProducts={checkoutProducts} />} />
        <Route path="/shop/:slug" element={<ProductViewComponent handleCheckout={handleCheckoutProducts} checkoutProducts={checkoutProducts} />} />
        <Route path="/shop/checkout" element={<CheckoutView checkout={checkoutProducts} handleCheckout={handleCheckoutProducts} />} />
        <Route path="/dashboard" element={<DashboardLayoutView><div>empty</div></DashboardLayoutView>} />
        <Route path="/dashboard/shop" element={<DashboardLayoutView><ShopDashboardListView/></DashboardLayoutView>} />
        <Route path="/dashboard/shop/:id" element={<DashboardLayoutView><ShopDashboardDetailsView product={Products[0]} handleCheckout={handleCheckoutProducts} /></DashboardLayoutView>} />
        <Route path="/dashboard/shop/create" element={<DashboardLayoutView><ShopDashboardCreateView/></DashboardLayoutView>} />
        <Route path="/dashboard/shop/edit/:id" element={<DashboardLayoutView><ShopDashboardEditView/></DashboardLayoutView>} />
        <Route path="/dashboard/order" element={<DashboardLayoutView><OrderDashboardListView/></DashboardLayoutView>} />
        <Route path="/dashboard/order/:id" element={<DashboardLayoutView><OrderDashboardDetailsView order={OrderDate} handleCheckout={handleCheckoutProducts} /></DashboardLayoutView>} />
        <Route path="/dashboard/calendar" element={<DashboardLayoutView><CalendarDashboardView order={OrderDate} handleCheckout={handleCheckoutProducts} /></DashboardLayoutView>} />
        <Route path="/dashboard/analytics" element={<DashboardLayoutView><AnalyticsDashboardView /></DashboardLayoutView>} />
        <Route path="/dashboard/banking" element={<DashboardLayoutView><BankingDashboardView /></DashboardLayoutView>} />
        <Route path="/dashboard/mail" element={<DashboardLayoutView><MailDashboardView /></DashboardLayoutView>} />
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


export const ProductViewComponent = ({ handleCheckout, checkoutProducts }: { handleCheckout: (data: any) => void, checkoutProducts: { [key: string]: any } }) => {
  const { slug } = useParams()
  const Product = Products.filter(product => product.name == slug)[0];

  return <ProductView product={Product} handleCheckout={handleCheckout} checkoutProducts={checkoutProducts} />
}