// import "../../doc/css/main.css";
import { useContext, useRef, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { AppContext } from "../../App";
import ProductItem from "./ProductItem";
import { useReactToPrint } from "react-to-print";
import PaginationCustom from "../../components/pagination";
import { Button, Modal } from "react-bootstrap";

function Product() {
  const componentPDF = useRef();
  const { products, setProducts, brands } = useContext(AppContext);
  console.log("🚀 ~ Product ~ products:", products);

  //pagination
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState(1);

  const handleGeneratePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "products",
  });

  // create prodcut modal
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = (e) => {
    e.preventDefault();
    setShow(true);
  };

  // product information
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState();
  const [materials, setMaterials] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState(1);

  const handleSubmit = async () => {
    async function create(url = "http://localhost:3001/api/v1/products", data = {}) {
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
    const insertedId = await create("http://localhost:3001/api/v1/products", {
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
    setProducts([
      ...products,
      {
        id: insertedId.insertId,
        name,
        stock,
        price,
        brand: brands[brand]?.name,
        discount,
        weight,
        dimensions,
        materials,
        shortDescription,
        fullDescription,
        category: "Điện thoại",
      },
    ]);
    handleCloseModal();
  };

  return (
    <div className="app sidebar-mini rtl pace-done">
      <Header />
      <Sidebar />
        <main class="app-content">
        <div class="app-title">
          <ul class="app-breadcrumb breadcrumb side">
            <li class="breadcrumb-item active">
              <a href="#">
                <b>Danh sách sản phẩm</b>
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
                    <a class="btn btn-add btn-sm" title="Thêm" onClick={handleShowModal}>
                      <i class="fas fa-plus"></i>
                      Tạo mới sản phẩm
                    </a>
                  </div>
                  <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thêm một sản phẩm</Modal.Title>
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
                          <input
                            class="form-control"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
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
                          <input
                            class="form-control"
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
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
                      <Button variant="btn btn-save" onClick={handleSubmit}>
                        Save Changes
                      </Button>
                      <Button variant="btn btn-cancel" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <div class="col-sm-2">
                    <a class="btn btn-delete btn-sm pdf-file" type="button" title="In" onClick={handleGeneratePDF}>
                      <i class="fas fa-file-pdf"></i> Xuất PDF
                    </a>
                  </div>
                </div>
                <div ref={componentPDF}>
                  <table class="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tình trạng</th>
                        <th>Giá tiền</th>
                        <th>Hãng</th>
                        <th>Danh mục</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
                        if (index >= (active - 1) * limit && index <= limit * active - 1) {
                          return <ProductItem item={product} />;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationCustom start={1} end={Math.ceil(products.length / limit)} onActive={setActive} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;
