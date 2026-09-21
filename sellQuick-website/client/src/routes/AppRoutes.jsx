import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Search from "../pages/Search";
import PropertyDetails from "../pages/PropertyDetails";
import Properties from "../pages/Properties";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
      <Route
        path="/property/:id"
        element={<PropertyDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;