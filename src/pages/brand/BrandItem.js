import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppContext } from "../../App";

function BrandItem({ item, dashboard }) {
  console.log("🚀 ~ BrandItem ~ item:", item);
  const app = useContext(AppContext);
  // brand information
  const [name, setName] = useState(item.name);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

  const handleUpdateSubmit = () => {
    async function update(url = "http://localhost:3001/api/v1/brands", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
    update("http://localhost:3001/api/v1/brands", {
      id: item.id,
      name,
    });
    app.handleEditBrand(item.id, { id: item.id, name });
    setName("");
    handleCloseModalUpdate();
  };

  const handleDeleteSubmit = () => {
    async function deleteProduct(url = "http://localhost:3001/api/v1/brands", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
    deleteProduct("http://localhost:3001/api/v1/brands", {
      id: item.id,
    });
    app.handleDeleteBrand(item.id);
    handleCloseModalDelete();
  };
  return (
    <tr>
      <td>#{item.id}</td>
      <td>{item?.name}</td>
      {!dashboard && (
        <td>
          <button class="btn btn-primary btn-sm trash mr-2" type="button" onClick={handleShowModalDelete} id="show-emp">
            <i class="fas fa-trash-alt"></i>
          </button>

          <Modal show={showModalDelete} onHide={handleCloseModalDelete} className="modal-delete">
            <Modal.Header closeButton>
              <Modal.Title>Xóa hãng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Bạn có chắc chắn muốn xóa hãng này không?</p>
            </Modal.Body>
            <Modal.Footer className="my-3">
              <Button variant="btn btn-save" onClick={handleDeleteSubmit}>
                Xác nhận
              </Button>
              <Button variant="btn btn-cancel" onClick={handleCloseModalDelete}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
          <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onClick={handleShowModalUpdate}>
            <i class="fas fa-edit"></i>
          </button>
          <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Chỉnh sửa thông tin hãng cơ bản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="row">
                <div class="form-group col-md-12">
                  <label class="control-label">Tên hãng:</label>
                  <input
                    class="form-control"
                    type="text"
                    required
                    value={name || item.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="my-3">
              <Button variant="btn btn-save" onClick={handleUpdateSubmit}>
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

export default BrandItem;
