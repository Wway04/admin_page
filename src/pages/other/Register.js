import PropTypes from "prop-types";
import React from "react";

const URL = "http://localhost:3001/api/v1/users";

const Register = () => {
  return (
    <div>
      <header class="app-header">
        <a class="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
        <ul class="app-nav">
          <li>
            <a class="app-nav__item" href="/index.html">
              <i class="bx bx-log-out bx-rotate-180"></i>{" "}
            </a>
          </li>
        </ul>
      </header>
      <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside class="app-sidebar">
        <div class="app-sidebar__user">
          <img class="app-sidebar__user-avatar" src="/images/hay.jpg" width="50px" alt="User Image" />
          <div>
            <p class="app-sidebar__user-name">
              <b>Võ Trường</b>
            </p>
            <p class="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
          </div>
        </div>
        <ul class="app-menu">
          <li>
            <a class="app-menu__item haha" href="phan-mem-ban-hang.html">
              <i class="app-menu__icon bx bx-cart-alt"></i>
              <span class="app-menu__label">POS Bán Hàng</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item active" href="index.html">
              <i class="app-menu__icon bx bx-tachometer"></i>
              <span class="app-menu__label">Bảng điều khiển</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item " href="table-data-table.html">
              <i class="app-menu__icon bx bx-id-card"></i> <span class="app-menu__label">Quản lý nhân viên</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="#">
              <i class="app-menu__icon bx bx-user-voice"></i>
              <span class="app-menu__label">Quản lý khách hàng</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="table-data-product.html">
              <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span class="app-menu__label">Quản lý sản phẩm</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="table-data-oder.html">
              <i class="app-menu__icon bx bx-task"></i>
              <span class="app-menu__label">Quản lý đơn hàng</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="table-data-banned.html">
              <i class="app-menu__icon bx bx-run"></i>
              <span class="app-menu__label">Quản lý nội bộ</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="table-data-money.html">
              <i class="app-menu__icon bx bx-dollar"></i>
              <span class="app-menu__label">Bảng kê lương</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="quan-ly-bao-cao.html">
              <i class="app-menu__icon bx bx-pie-chart-alt-2"></i>
              <span class="app-menu__label">Báo cáo doanh thu</span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="page-calendar.html">
              <i class="app-menu__icon bx bx-calendar-check"></i>
              <span class="app-menu__label">Lịch công tác </span>
            </a>
          </li>
          <li>
            <a class="app-menu__item" href="#">
              <i class="app-menu__icon bx bx-cog"></i>
              <span class="app-menu__label">Cài đặt hệ thống</span>
            </a>
          </li>
        </ul>
      </aside>
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
                      <b>56 khách hàng</b>
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
                      <b>1850 sản phẩm</b>
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
                      <b>247 đơn hàng</b>
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
                      <b>4 sản phẩm</b>
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
                        <tr>
                          <td>AL3947</td>
                          <td>Phạm Thị Ngọc</td>
                          <td>19.770.000 đ</td>
                          <td>
                            <span class="badge bg-info">Chờ xử lý</span>
                          </td>
                        </tr>
                        <tr>
                          <td>ER3835</td>
                          <td>Nguyễn Thị Mỹ Yến</td>
                          <td>16.770.000 đ</td>
                          <td>
                            <span class="badge bg-warning">Đang vận chuyển</span>
                          </td>
                        </tr>
                        <tr>
                          <td>MD0837</td>
                          <td>Triệu Thanh Phú</td>
                          <td>9.400.000 đ</td>
                          <td>
                            <span class="badge bg-success">Đã hoàn thành</span>
                          </td>
                        </tr>
                        <tr>
                          <td>MT9835</td>
                          <td>Đặng Hoàng Phúc </td>
                          <td>40.650.000 đ</td>
                          <td>
                            <span class="badge bg-danger">Đã hủy </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                          <th>Ngày sinh</th>
                          <th>Số điện thoại</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#183</td>
                          <td>Hột vịt muối</td>
                          <td>21/7/1992</td>
                          <td>
                            <span class="tag tag-success">0921387221</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#219</td>
                          <td>Bánh tráng trộn</td>
                          <td>30/4/1975</td>
                          <td>
                            <span class="tag tag-warning">0912376352</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#627</td>
                          <td>Cút rang bơ</td>
                          <td>12/3/1999</td>
                          <td>
                            <span class="tag tag-primary">01287326654</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#175</td>
                          <td>Hủ tiếu nam vang</td>
                          <td>4/12/20000</td>
                          <td>
                            <span class="tag tag-danger">0912376763</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Dữ liệu 6 tháng đầu vào</h3>
                  <div class="embed-responsive embed-responsive-16by9">
                    <canvas class="embed-responsive-item" id="lineChartDemo"></canvas>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="tile">
                  <h3 class="tile-title">Thống kê 6 tháng doanh thu</h3>
                  <div class="embed-responsive embed-responsive-16by9">
                    <canvas class="embed-responsive-item" id="barChartDemo"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center" style={{ "font-size": "13px" }}>
          <p>
            <b>Copyright</b>
          </p>
        </div>
      </main>
    </div>
  );
};

Register.propTypes = {
  location: PropTypes.object,
};

export default Register;
