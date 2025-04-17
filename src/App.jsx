import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import { OrderProvider } from "./context/ordersContext";
import OrdersOverview from "./pages/OrdersOverview";
import NewOrder from "./pages/NewOrder";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <OrderProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <div
            className={`main-container ${darkMode ? "dark" : "light"}`}
            style={{ minHeight: "100dvh" }}
          >
            <main>
              <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<OrdersOverview />} />
                <Route path="/new-order" element={<NewOrder />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </OrderProvider>
  );
}

export default App;
