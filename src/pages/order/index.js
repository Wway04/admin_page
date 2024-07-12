import "../../doc/css/main.css";
import { useContext, useRef, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { AppContext } from "../../App";
import OrderItem from "./OrderItem";
import { useReactToPrint } from "react-to-print";
import PaginationCustom from "../../components/pagination";

function Order() {
  const { orders } = useContext(AppContext) || [];
  const componentPDF = useRef();

  //pagination
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState(1);

  const handleGeneratePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "orders",
  });

  return (
    <div className="app sidebar-mini rtl pace-done order">
      <Header />
      <Sidebar />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="/">
                <b>Danh sách đơn hàng</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <a className="btn btn-delete btn-sm pdf-file" type="button" title="In" onClick={handleGeneratePDF}>
                      <i className="fas fa-file-pdf"></i> Xuất PDF
                    </a>
                  </div>
                </div>
                <div ref={componentPDF}>
                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Tình trạng</th>
                        <th>Tính năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => {
                        if (index >= (active - 1) * limit && index <= limit * active - 1) {
                          return <OrderItem item={order} />;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationCustom start={1} end={Math.ceil(orders.length / 10)} onActive={setActive} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Order;
