// import "../../doc/css/main.css";
import { useContext, useRef, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { AppContext } from "../../App";
import UserItem from "./UserItem";

import { useReactToPrint } from "react-to-print";
import PaginationCustom from "../../components/pagination";

function User() {
  const { users } = useContext(AppContext) || [];
  const componentPDF = useRef();

  //pagination
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState(1);
  const handleGeneratePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "users",
  });

  // a

  return (
    <div className="app sidebar-mini rtl pace-done user">
      <Header />
      <Sidebar />
      <main class="app-content">
        <div class="app-title">
          <ul class="app-breadcrumb breadcrumb side">
            <li class="breadcrumb-item active">
              <a href="#">
                <b>Danh sách người dùng</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="tile">
              <div class="tile-body">
                <div class="row element-button">
                  <div class="col-sm-2">
                    <a class="btn btn-delete btn-sm pdf-file" type="button" title="In" onClick={handleGeneratePDF}>
                      <i class="fas fa-file-pdf"></i> Xuất PDF
                    </a>
                  </div>
                </div>
                <div ref={componentPDF}>
                  <table
                    class="table table-hover table-bordered js-copytextarea"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => {
                        if (index >= (active - 1) * limit && index <= limit * active - 1) {
                          return <UserItem item={user} />;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationCustom start={1} end={Math.ceil(users.length / limit)} onActive={setActive} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
