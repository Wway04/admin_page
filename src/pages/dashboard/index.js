import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { AppContext } from "../../App";
import OrderItem from "../order/OrderItem";
import UserItem from "../user/UserItem";
import PaginationCustom from "../../components/pagination";

Chart.register(CategoryScale);

const COLORS = [
  "#F5A9BC",
  "#A9BCF5",
  "#D0A9F5",
  "#F3E2A9",
  "#A9F5D0",
  "#FFCE56",
  "#FF6384",
  "#36A2EB",
  "#4BC0C0",
  "#9966FF",
  "#FFCE56",
  "#FF6384",
  "#36A2EB",
  "#4BC0C0",
  "#9966FF",
  "#FFCE56",
  "#FF6384",
];

function Dashboard() {
  const { users, products, orders, statistics } = useContext(AppContext);
  const [productSellest, setProductSellest] = useState([]);
  const [colors, setColors] = useState([]);
  const [data, setData] = useState([]);
  const [productRunOOS, setProductRunOOS] = useState(0);

  //data statistics
  useEffect(() => {
    const TEST = [];
    let position = 0;
    TEST.push(statistics[position]);
    for (let index = 1; index < statistics.length; index++) {
      if (statistics[position].month === statistics[index].month) {
        // 6 = 6
        TEST[position].price = parseInt(TEST[position].price) + parseInt(statistics[index].price);
      } else {
        TEST[0].price = parseInt(TEST[0].price);
        position++;
        TEST.push(statistics[index]);
        TEST[position].price = parseInt(TEST[position].price);
      }
    }
    const result = [];
    for (let index = 1; index < 7; index++) {
      result.push({ price: 0, month: index });
    }
    for (let index = 0; index < TEST.length; index++) {
      const month = TEST[index]?.month;
      const price = TEST[index]?.price;
      result[month - 1].price = price;
    }
    setData(result);
  }, [statistics]);
  // SET THỐNG KẾ DẠNG CỘT
  useEffect(() => {
    setBarData({
      labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
      datasets: [
        { label: "Revenue", data: data.map((item) => item?.price) },
        {
          label: "Loss",
          data: data.map((item) => (item?.price - 100 > 0 ? item?.price - 100 : 0)),
        },
      ],
    });
  }, [data]);
  //CÁC SẢN PHẨM BÁN TRÊN 40 SẢN PHẨM -> SẢN PHẨM BÁN CHẠY
  useEffect(() => {
    const pSellest = [];
    products.forEach((product) => {
      if (product.saleCount > 40) {
        pSellest.push(product);
      }
    });
    setProductSellest(pSellest);
    let count = 0;
    products.forEach((product) => {
      if (product.stock < 5) {
        count++;
      }
    });
    setProductRunOOS(count);
  }, [products]);
  // SET THỐNG KẾ DẠNG TRÒN
  useEffect(() => {
    const colorsChart = [];
    for (let index = 0; index < productSellest.length; index++) {
      colorsChart.push(COLORS[index]);
    }
    setColors(colorsChart);
    setChartData({
      labels: productSellest.map((product) => product.name),
      datasets: [
        {
          label: "Sale count",
          data: productSellest.map((product) => product.saleCount),
          backgroundColor: [
            "#F5A9BC",
            "#A9BCF5",
            "#D0A9F5",
            "#F3E2A9",
            "#A9F5D0",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#4BC0C0",
            "#9966FF",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#4BC0C0",
            "#9966FF",
          ],
          borderRadius: 5,
        },
      ],
    });
  }, [productSellest, products]);
  // DỮ LIỆU BIỂu ĐỒ TRÒN
  const [chartData, setChartData] = useState({
    labels: productSellest.map((product) => product.name),
    datasets: [
      {
        label: "Product",
        data: products.map((product) => product.saleCount),
        backgroundColor: colors,
        borderRadius: 5,
      },
    ],
  });
  // DỮ LIỆU BIỂu ĐỒ CỘT
  const [barData, setBarData] = useState({
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      { label: "Revenue", data: data.map((item) => item?.price) },
      {
        label: "Loss",
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  });

  //pagination order status
  const [limit, setLimit] = useState(8);
  const [active, setActive] = useState(1);

  //pagination new customer
  const [activeCustomer, setActiveCustomer] = useState(1);

  return (
    <div className="app sidebar-mini rtl pace-done dash-board ">
      <Header />
      <Sidebar />
      <main class="app-content">
        <div class="row">
          <div class="col-md-12">
            <div class="app-title">
              <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">
                    <b>Bảng điều khiển</b>
                  </a>
                </li>
              </ul>
              <div id="clock"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-md-6">
                <div class="widget-small primary coloured-icon">
                  <i class="icon bx bxs-user-account fa-3x"></i>
                  <div class="info">
                    <h4>Tổng khách hàng</h4>
                    <p>
                      <b>{users.length} khách hàng</b>
                    </p>
                    <p class="info-tong">Tổng số khách hàng được quản lý.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="widget-small info coloured-icon">
                  <i class="icon bx bxs-data fa-3x"></i>
                  <div class="info">
                    <h4>Tổng sản phẩm</h4>
                    <p>
                      <b>{products.length} sản phẩm</b>
                    </p>
                    <p class="info-tong">Tổng số sản phẩm được quản lý.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="widget-small warning coloured-icon">
                  <i class="icon bx bxs-shopping-bags fa-3x"></i>
                  <div class="info">
                    <h4>Tổng đơn hàng</h4>
                    <p>
                      <b>{orders.length} đơn hàng</b>
                    </p>
                    <p class="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="widget-small danger coloured-icon">
                  <i class="icon bx bxs-error-alt fa-3x"></i>
                  <div class="info">
                    <h4>Sắp hết hàng</h4>
                    <p>
                      <b>{productRunOOS} sản phẩm</b>
                    </p>
                    <p class="info-tong">Số sản phẩm cảnh báo hết cần nhập thêm.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Tình trạng đơn hàng</h3>
                  <div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => {
                          if (index >= (active - 1) * limit && index <= limit * active - 1) {
                            return <OrderItem item={order} dashboard />;
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  <PaginationCustom start={1} end={Math.ceil(orders.length / limit)} onActive={setActive} />
                </div>
              </div>
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Khách hàng mới</h3>
                  <div>
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên khách hàng</th>
                          <th>Địa chỉ</th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => {
                          if (index >= (activeCustomer - 1) * limit && index <= limit * activeCustomer - 1) {
                            return <UserItem item={user} dashboard />;
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  <PaginationCustom start={1} end={Math.ceil(users.length / limit)} onActive={setActiveCustomer} />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Sản phẩm bán chạy</h3>
                  <Pie
                    data={chartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Sản phẩm bán chạy",
                        },
                      },
                    }}
                  />
                  <canvas class="embed-responsive-item" id="lineChartDemo"></canvas>
                </div>
              </div>
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Thống kê 6 tháng doanh thu</h3>
                  <div>
                    <Bar
                      data={barData}
                      options={{
                        plugins: {
                          title: {
                            display: true,
                            text: "Doanh thu 6 tháng qua",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
