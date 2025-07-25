import ReactDOM from "react-dom/client";

// import "./index.css";
import ProductView from "./modules/shop/product/ProductView";
import { Products } from "./modules/shop/products/ProductsData";
import ProductsView from "./modules/shop/products/ProductsView";
import NewestBooking from "./post/newest-booking";
import MainTable from "./table/table";
import Upload from "./upload/upload";
import CheckoutView from "./modules/shop/checkout/CheckoutView";
// import DashboardLayout from "./modules/dashboard/layout";
import { Checkout } from "./modules/shop/checkout/CheckoutData";
import { useState } from "react";
import DashboardLayout from "./modules/dashboard/dashboard/layout";
import { ThemeProvider } from "./theme/theme-provider";
import DashboardLayoutView from "./modules/dashboard/dashboardLayoutView/dashboardLayoutView";
import ShopDashboardDetailsView from "./modules/shop-dashboard/shop-dashboard-details/shop-dashboard-details-view";
import ShopDashboardListView from "./modules/shop-dashboard/shop-dashboard-list/shop-dashboard-list-view";
import ShopDashboardCreateView from "./modules/shop-dashboard/shop-dashboard-create/shop-dashboard-create-view";
import OrderDashboardListView from "./modules/order-dashboard/order-dashboard-list/order-dashboard-list-view";
import OrderDashboardDetailsView from "./modules/order-dashboard/order-dashboard-details/order-dashboard-details-view";
import { OrderDate } from "./modules/order-dashboard/order-dashboard-details/order-data";
import CalendarDashboardView from "./modules/calendar-dashboard/calendar-dashboard-view";
import AnalyticsDashboardView from "./modules/analytics-dashboard/analytics-dashboard-view";
import BankingDashboardView from "./modules/banking-dashboard/banking-dashboard-view";

const App = () => {
  const [checkoutProducts, setCheckoutProducts] = useState(Checkout)

  const handleCheckoutProducts = (data: any) => setCheckoutProducts(data)

  return <>
    {/* <div className="text-xs mx-auto max-w-6xl flex flex-col gap-5 py-10"> */}
    {/* <div>Name: components</div>
    <div>Framework: react-19</div> */}
    {/* <ProductsView products={Products} /> */}
    {/* <ProductView product={Products[1]}/> */}
    {/* <CheckoutView checkout={checkoutProducts} handleCheckout={handleCheckoutProducts}/> */}
    {/* <DashboardLayoutView><ShopDashboardListView/></DashboardLayoutView> */}
    <DashboardLayoutView><BankingDashboardView /></DashboardLayoutView>
    {/* <div className="grid grid-cols-4 gap-5">
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
    </div> */}
    {/* <div className="grid grid-cols-2 gap-5">
      <Upload />
      <Upload multiple={true} />
    </div> */}
    {/* <MainTable /> */}
    {/* </div> */}
  </>
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);