import ReactDOM from "react-dom/client";
import NewestBooking from "components/NewestBooking";
import Upload from "components/Upload";
import Table from "components/Table";

import "./index.css";

const App = () => (
  <div className="py-10 text-3xl mx-auto max-w-6xl flex flex-col gap-5">
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
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);