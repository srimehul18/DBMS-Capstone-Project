
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Apartments from "./pages/Apartments";
import Residents from "./pages/Residents";
import Maintenance from "./pages/Maintenance";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";
import Staff from "./pages/Staff";
import Parking from "./pages/Parking";
import Amenities from "./pages/Amenities";
import Visitors from "./pages/Visitors";
import { useState } from "react";

const pages = {
  Dashboard,
  Apartments,
  Residents,
  Maintenance,
  Payments,
  Complaints,
  Staff,
  Parking,
  Amenities,
  Visitors,
};

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const ActiveComponent = pages[activePage] || Dashboard;

  return (
    <AppLayout
      activePage={activePage}
      setActivePage={setActivePage}
    >
      <ActiveComponent />
    </AppLayout>
  );
}
