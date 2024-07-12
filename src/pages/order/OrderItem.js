import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppContext } from "../../App";

function OrderItem({ item, dashboard }) {
  const app = useContext(AppContext);
  const [status, setStatus] = useState(item.status || "2");
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);

  const handleSubmitUpdate = () => {
    async function update(url = "http://localhost:3001/api/v1/orders", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }
    update("http://localhost:3001/api/v1/orders", {
      id: item.id,
      status: parseInt(status),
    });
    app.handleEditOrder(item.id, { id: item.id, status });
    handleCloseModalUpdate();
  };

  return (
    <tr>
      <td>#{item.id}</td>
      <td>{item?.name}</td>
      {!dashboard && <td>{item.quantity}</td>}
      <td>${item.price}</td>
      <td>
        {item?.status === "2" ? (
          <span class="badge bg-success">Hoàn thành</span>
        ) : item?.status === "1" ? (
          <span class="badge bg-warning">Đang vận chuyển</span>
        ) : item?.status === "0" ? (
          <span class="badge bg-info">Đang xử lí</span>
        ) : (
          <span class="badge bg-danger">Đã hủy</span>
        )}
      </td>
      {!dashboard && (
        <td>
          <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onClick={handleShowModalUpdate}>
            <i class="fas fa-edit"></i>
          </button>
          <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Chỉnh sửa thông tin hóa đơn cơ bản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="row">
                <div class="form-group col-md-12">
                  <label for="exampleSelect1" class="control-label">
                    Tình trạng
                  </label>
                  <select
                    class="form-control"
                    id="exampleSelect1"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value={"2"}>Hoàn thành</option>
                    <option value={"1"}>Đang vận chuyển</option>
                    <option value={"0"}>Chờ xử lý</option>
                    <option value={"-1"}>Đã hủy</option>
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="my-3">
              <Button variant="btn btn-save" onClick={handleSubmitUpdate}>
                Xác nhận
              </Button>
              <Button variant="btn btn-cancel" onClick={handleCloseModalUpdate}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
      )}
    </tr>
  );
}

export default OrderItem;
