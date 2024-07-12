import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppContext } from "../../App";

function ProductItem({ item }) {
  console.log("🚀 ~ ProductItem ~ item:", item);
  const { brands, handleEditProduct, handleDeleteProduct } = useContext(AppContext);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

  // product information
  const [name, setName] = useState(item?.name);
  const [stock, setStock] = useState(item?.stock);
  const [price, setPrice] = useState(item?.price);
  const [brand, setBrand] = useState(1);
  const [discount, setDiscount] = useState(item?.discount);
  const [weight, setWeight] = useState(item?.weight);
  const [dimensions, setDimensions] = useState(item?.weight);
  const [materials, setMaterials] = useState(item?.materials);
  const [shortDescription, setShortDescription] = useState(item?.shortDescription);
  const [fullDescription, setFullDescription] = useState(item?.fullDescription);
  const [category, setCategory] = useState(1);

  const handleUpdateSubmit = () => {
    async function update(url = "http://localhost:3001/api/v1/products", data = {}) {
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
    update("http://localhost:3001/api/v1/products", {
      id: item.id,
      name,
      stock,
      price,
      product_brand_id: brand,
      discount,
      weight,
      dimensions,
      materials,
      short_description: shortDescription,
      full_description: fullDescription,
      product_type_id: category,
    });
    handleEditProduct(item.id, {
      id: item.id,
      name,
      stock,
      price,
      product_brand_id: brand,
      discount,
      weight,
      dimensions,
      materials,
      short_description: shortDescription,
      full_description: fullDescription,
      product_type_id: category,
    });
    setName("");
    setStock(0);
    setPrice(0);
    setBrand(1);
    setDiscount(0);
    setWeight(0);
    setDimensions("");
    setMaterials("");
    setShortDescription("");
    setFullDescription("");
    setCategory(1);
    handleCloseModalUpdate();
  };

  const handleDeleteSubmit = () => {
    async function deleteProduct(url = "http://localhost:3001/api/v1/products", data = {}) {
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
    deleteProduct("http://localhost:3001/api/v1/products", {
      id: item.id,
    });
    handleDeleteProduct(item.id);
    handleCloseModalDelete();
  };

  return (
    <tr>
      <td>#{item.id}</td>
      <td>{item.name}</td>
      <td>{item.stock}</td>
      <td>
        {item.stock > 0 ? (
          <span class="badge bg-success">Còn hàng</span>
        ) : (
          <span class="badge bg-danger">Hết hàng</span>
        )}
      </td>
      <td>${item.price}</td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>
        <button class="btn btn-primary btn-sm trash mr-2" type="button" onClick={handleShowModalDelete} id="show-emp">
          <i class="fas fa-trash-alt"></i>
        </button>

        <Modal show={showModalDelete} onHide={handleCloseModalDelete} className="modal-delete">
          <Modal.Header closeButton>
            <Modal.Title>Xóa sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
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

        <button
          class="btn btn-primary btn-sm edit"
          type="button"
          title="Sửa"
          id="show-emp"
          onClick={handleShowModalUpdate}
        >
          <i class="fas fa-edit"></i>
        </button>

        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thông tin sản phẩm cơ bản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="row">
              <div class="form-group col-md-12">
                <label class="control-label">Tên sản phẩm:</label>
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
                  Danh mục:
                </label>
                <select
                  class="form-control"
                  id="exampleSelect1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={1}>Điện thoại di động</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="exampleSelect1" class="control-label">
                  Hãng:
                </label>
                <select
                  class="form-control"
                  id="exampleSelect1"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((brand) => (
                    <option value={brand.id}>{brand.name}</option>
                  ))}
                  ))
                </select>
              </div>
              <div class="form-group  col-md-4">
                <label class="control-label">Số lượng:</label>
                <input
                  class="form-control"
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">Giá bán($):</label>
                <input class="form-control" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">Khuyến mãi(%):</label>
                <input
                  class="form-control"
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">Vật liệu:</label>
                <input
                  class="form-control"
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">Trọng lượng(g): </label>
                <input class="form-control" type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">Kích thước(cm)</label>
                <input
                  class="form-control"
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </div>
              <div class="form-group col-md-6">
                <label class="control-label">Mô tả ngắn:</label>
                <textarea
                  class="form-control"
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                ></textarea>
              </div>
              <div class="form-group col-md-6">
                <label class="control-label">Mô tả đầy đủ:</label>
                <textarea
                  class="form-control"
                  type="text"
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                ></textarea>
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
    </tr>
  );
}

export default ProductItem;
