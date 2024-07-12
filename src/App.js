import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import ForgotPassword from "./pages/other/ForgotPassword";
import Login from "./pages/other/Login";
import Register from "./pages/other/Register";
import Product from "./pages/product";
import Report from "./pages/report";
import User from "./pages/user";
import Brand from "./pages/brand";
import Voucher from "./pages/voucher";

const URL = "http://localhost:3001/api/v1";

export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [statistics, setStatistics] = useState([{ month: 1, price: 0 }]);
  const [brands, setBrands] = useState([]);  
  
  const [active, setActive] = useState(1);

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
    async function getBrands() {
      const response = await fetch(`${URL}/brands`);
      const brands = await response.json();
      setBrands(brands);
    }
    async function getVouchers() {
      const response = await fetch(`${URL}/vouchers`);
      const vouchers = await response.json();
      setVouchers(vouchers);
    }
    getVouchers();
    getUser();
    getOrder();
    getProduct();
    getBrands();
    getStatistics();
  }, []);

  const handleEditProduct = (id, productNew) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return productNew;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleEditBrand = (id, brandNew) => {
    const newBrands = brands.map((brand) => {
      if (brand.id === id) {
        return brandNew;
      }
      return brand;
    });
    setBrands(newBrands);
  };

  const handleEditOrder = (id, orderNew) => {
    const newOrders = orders.map((order) => {
      if (order.id === id) {
        return { ...order, status: orderNew.status };
      }
      return order;
    });
    setOrders(newOrders);
  };

  const handleDeleteBrand = (id) => {
    const newBrands = brands.filter((brand) => brand.id !== id);
    setBrands(newBrands);
  };

  const handleDeleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };

  const handleEditVoucher = (id, productNew) => {
    const newProducts = vouchers.map((product) => {
      if (product.id === id) {
        return productNew;
      }
      return product;
    });
    setVouchers(newProducts);
  };

  const handleDeleteVoucher = (id) => {
    const newProducts = vouchers.filter((product) => product.id !== id);
    setVouchers(newProducts);
  };

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
    <AppContext.Provider
      value={{
        products,
        orders,
        brands,
        users,
        vouchers,
        statistics,
        login,
        active,
        setProducts,
        setVouchers,
        setBrands,
        setActive,
        handleLogin,
        handleLogout,
        handleEditProduct,
        handleDeleteProduct,
        handleEditVoucher,
        handleDeleteVoucher,
        handleEditBrand,
        handleDeleteBrand,
        handleEditOrder,
      }}
    >
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/dash-board"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/product"} element={<Product />} />
          <Route path={"/voucher"} element={<Voucher />} />
          <Route path={"/brand"} element={<Brand />} />
          <Route path={"/order"} element={<Order />} />
          <Route path={"/user"} element={<User />} />
          <Route path={"/report"} element={<Report />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
