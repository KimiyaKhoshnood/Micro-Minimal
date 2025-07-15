import ReactDOM from "react-dom/client";

import "./index.css";
import ProductView from "./modules/shop/product/ProductView";
import { Products } from "./modules/shop/products/ProductsData";
import ProductsView from "./modules/shop/products/ProductsView";
import NewestBooking from "./post/newest-booking";
import MainTable from "./table/table";
import Upload from "./upload/upload";

const App = () => {
  return <div className="text-xs mx-auto max-w-6xl flex flex-col gap-5 py-10">
    <div>Name: components</div>
    <div>Framework: react-19</div>
    <ProductView product={Products[1]}/>
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
    {/* <ProductsView products={Products} /> */}
    {/* <div className="grid grid-cols-2 gap-5">
      <Upload />
      <Upload multiple={true} />
    </div> */}
    {/* <MainTable /> */}
  </div>
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);