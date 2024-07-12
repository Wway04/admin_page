import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { AppContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import PaginationCustom from "../../components/pagination";

function Report() {
  const { users, products, orders, statistics } = useContext(AppContext);
  const [productOutOfStock, setProductOutOfStock] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // pagination
  const [limit, setLimit] = useState(5);
  const [activeProductSale, setActiveProductSale] = useState(1);
  const [productBestSales, setProductBestSales] = useState([]);
  const [activeOrder, setActiveOrder] = useState(1);
  const [activeProductSoldOut, setActiveProductSoldOut] = useState(1);

  useEffect(() => {
    const result = [];
    products.forEach((product) => {
      if (product.stock === 0) {
        result.push(product);
      }
    });
    setProductOutOfStock(result);
  }, [products]);

  useEffect(() => {
    const result = products.sort((a, b) => {
      return b.saleCount - a.saleCount;
    });
    const topFive = result.slice(0, 5); // Get the first 5 elements
    setProductBestSales(topFive);
  }, [products]);

  useEffect(() => {
    const result = orders.reduce((a, b) => {
      return a + parseInt(b.price);
    }, 0);

    setOrderTotal(result);
  }, [orders]);

  console.log("test");

  return (
    <div className="app sidebar-mini rtl">
      <Header />
      <Sidebar />
      <main className="app-content">
        <div className="row">
          <div className="col-md-12">
            <div className="app-title">
              <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">
                    <b>Báo cáo doanh thu </b>
                  </a>
                </li>
              </ul>
              <div id="clock"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="widget-small info coloured-icon">
              <i className="icon bx bxs-purchase-tag-alt fa-3x"></i>
              <div className="info">
                <h4>Tổng sản phẩm</h4>
                <p>
                  <b>{products.length} sản phẩm</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small warning coloured-icon">
              <i className="icon fa-3x bx bxs-shopping-bag-alt"></i>
              <div className="info">
                <h4>Tổng đơn hàng</h4>
                <p>
                  <b>{orders.length} đơn hàng</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small primary coloured-icon">
              <i className="icon fa-3x bx bxs-chart"></i>
              <div className="info">
                <h4>Tổng thu nhập</h4>
                <p>
                  <b>${orderTotal}</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget-small warning coloured-icon">
              <i className="icon fa-3x bx bxs-tag-x"></i>
              <div className="info">
                <h4>Hết hàng</h4>
                <p>
                  <b>{productOutOfStock.length} sản phẩm</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div>
                <h3 className="tile-title">TOP 5 SẢN PHẨM BÁN CHẠY</h3>
              </div>
              <div className="tile-body">
                <table className="table table-hover table-bordered" id="sampleTable">
                  <thead>
                    <tr>
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá tiền</th>
                      <th>Lượt mua</th>
                      <th>Danh mục</th>
                      <th>Hãng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productBestSales.map((product, index) => {
                      if (index >= (activeProductSale - 1) * limit && index <= limit * activeProductSale - 1) {
                        return (
                          <tr>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.saleCount}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
                <PaginationCustom
                  start={1}
                  end={Math.ceil(productBestSales.length / limit)}
                  onActive={setActiveProductSale}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div>
                <h3 className="tile-title">TỔNG ĐƠN HÀNG</h3>
              </div>
              <div className="tile-body">
                <table className="table table-hover table-bordered" id="sampleTable">
                  <thead>
                    <tr>
                      <th>ID đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      if (index >= (activeOrder - 1) * limit && index <= limit * activeOrder - 1) {
                        return (
                          <tr>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
                <PaginationCustom start={1} end={Math.ceil(orders.length / limit)} onActive={setActiveOrder} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div>
                <h3 className="tile-title">SẢN PHẨM ĐÃ HẾT</h3>
              </div>
              <div className="tile-body">
                <table className="table table-hover table-bordered" id="sampleTable">
                  <thead>
                    <tr>
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Tình trạng</th>
                      <th>Giá tiền</th>
                      <th>Danh mục</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productOutOfStock.map((item, index) => {
                      if (index >= (activeProductSoldOut - 1) * limit && index <= limit * activeProductSoldOut - 1) {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.stock}</td>
                            <td>
                              <span className="badge bg-danger">Hết hàng</span>
                            </td>
                            <td>${item.price}</td>
                            <td>{item.category}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
                <PaginationCustom
                  start={1}
                  end={Math.ceil(productOutOfStock.length / limit)}
                  onActive={setActiveProductSoldOut}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Report;
