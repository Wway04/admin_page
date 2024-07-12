import { createContext, useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import Product from "./pages/product";
import Order from "./pages/order";
import User from "./pages/user";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/other/Login";
import Register from "./pages/other/Register";
import ForgotPassword from "./pages/other/ForgotPassword";
import Report from "./pages/report";

import { useRef } from "react";
import jsPDF from "jspdf";
import OrderItem from "./pages/order/OrderItem";

const URL = "http://localhost:3001/api/v1";

export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState([{ month: 1, price: 0 }]);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`${URL}/products`);
      const products = await response.json();
      setProducts(products);
    }
    async function getOrder() {
      const response = await fetch(`${URL}/orders`);
      const orders = await response.json();
      setOrders(orders);
    }
    async function getUser() {
      const response = await fetch(`${URL}/users`);
      const users = await response.json();
      setUsers(users);
    }
    async function getStatistics() {
      const response = await fetch(`${URL}/orders/statisticizing`);
      const statistics = await response.json();
      setStatistics(statistics);
    }
    getUser();
    getOrder();
    getProduct();
    getStatistics();
  }, []);

  const handleLogin = (username, password) => {
    localStorage.setItem("login", JSON.stringify({ username, password }));
    setLogin({ username, password });
  };

  const handleLogout = () => {
    localStorage.setItem("login", JSON.stringify({ username: "", password: "" }));
    setLogin({ username: "", password: "" });
    navigate("/login");
  };

  return (
    <AppContext.Provider value={{ products, orders, users, statistics, login, handleLogin, handleLogout }}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/dash-board"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/product"} element={<Product />} />
          <Route path={"/order"} element={<Order />} />
          <Route path={"/user"} element={<User />} />
          <Route path={"/report"} element={<Report />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
