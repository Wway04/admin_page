import "../../doc/css/main.css";
import { useContext, useRef, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { AppContext } from "../../App";
import VoucherItem from "./VoucherItem";
import { useReactToPrint } from "react-to-print";
import PaginationCustom from "../../components/pagination";
import { Button, Modal } from "react-bootstrap";

function Voucher() {
  const { vouchers, setVouchers } = useContext(AppContext) || [];
  const componentPDF = useRef();

  //pagination
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState(1);

  // voucher information
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [code, setCode] = useState();
  const [quantity, setQuantity] = useState(0);

  // create voucher modal
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleGeneratePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Vouchers",
  });

  const handleSubmit = async () => {
    async function create(url = "http://localhost:3001/api/v1/vouchers", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    const insertedId = await create("http://localhost:3001/api/v1/vouchers", {
      name,
      code,
      value,
      quantity,
    });
    setName("");
    setCode("");
    setQuantity(0);
    setValue(5);
    setVouchers([
      ...vouchers,
      {
        id: insertedId.insertId,
        name,
        value,
        quantity,
        code,
      },
    ]);
    handleCloseModal();
  };

  return (
    <div className="app sidebar-mini rtl pace-done Voucher">
      <Header />
      <Sidebar />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="/">
                <b>Danh sách mã giảm giá</b>
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
                  <div class="col-sm-2">
                    <a class="btn btn-add btn-sm" title="Thêm" onClick={handleShowModal}>
                      <i class="fas fa-plus"></i>
                      Tạo mới mã giảm giá
                    </a>
                  </div>
                  <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thêm một mã giảm giá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div class="row">
                        <div class="form-group col-md-12">
                          <label class="control-label">Tên mã giảm giá:</label>
                          <input
                            class="form-control"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="exampleSelect1" class="control-label">
                            Số lượng:
                          </label>
                          <input
                            class="form-control"
                            type="number"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="exampleSelect1" class="control-label">
                            Giá trị(%):
                          </label>
                          <select
                            class="form-control"
                            id="exampleSelect1"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                          </select>
                        </div>
                        <div class="form-group  col-md-12">
                          <label class="control-label">Code:</label>
                          <input
                            class="form-control"
                            type="text"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="my-3">
                      <Button variant="btn btn-save" onClick={handleSubmit}>
                        Save Changes
                      </Button>
                      <Button variant="btn btn-cancel" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <div className="col-sm-2">
                    <a className="btn btn-delete btn-sm pdf-file" type="button" title="In" onClick={handleGeneratePDF}>
                      <i className="fas fa-file-pdf"></i> Xuất PDF
                    </a>
                  </div>
                </div>
                <div ref={componentPDF}>
                  <table className="table table-hover table-bVouchered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Code</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchers.map((voucher, index) => {
                        if (index >= (active - 1) * limit && index <= limit * active - 1) {
                          return <VoucherItem item={voucher} />;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationCustom start={1} end={Math.ceil(vouchers.length / 10)} onActive={setActive} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Voucher;
