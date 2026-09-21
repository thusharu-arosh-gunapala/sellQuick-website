import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";
import Maintenance from "./pages/Maintenance";
import API from "./services/api";

function App() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data && res.data.maintenanceMode) {
          setMaintenanceMode(true);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) return null;

  if (maintenanceMode) {
    return <Maintenance />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;