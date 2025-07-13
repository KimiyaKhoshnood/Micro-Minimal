import ReactDOM from "react-dom/client";

import "./index.css";
import NewestBooking from "./post/newest-booking";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: components</div>
    <div>Framework: react-19</div>
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
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);