import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

function Sidebar() {
  const app = useContext(AppContext);
  return (
    <div>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <div style={{ color: "#fff" }}>
            <p className="app-sidebar__user-name" style={{ color: "#fff" }}>
              <h5>TechZones - Trang admin</h5>
            </p>
          </div>
        </div>
        <ul className="app-menu mt-4">
          <li>
            <Link
              className={`app-menu__item ${app.active === 1 ? "active" : ""}`}
              onClick={() => app.setActive(1)}
              to="/"
            >
              <i className="app-menu__icon bx bx-tachometer"></i>
              <span className="app-menu__label">Bảng điều khiển</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 2 ? "active" : ""}`}
              onClick={() => app.setActive(2)}
              to="/user"
            >
              <i className="app-menu__icon bx bx-user-voice"></i>
              <span className="app-menu__label">Quản lý người dùng</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 3 ? "active" : ""}`}
              onClick={() => app.setActive(3)}
              to="/product"
            >
              <i className="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 4 ? "active" : ""}`}
              onClick={() => app.setActive(4)}
              to="/brand"
            >
              <i class="app-menu__icon bx bxs-purchase-tag"></i>
              <span className="app-menu__label">Quản lý hãng</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 5 ? "active" : ""}`}
              onClick={() => app.setActive(5)}
              to="/voucher"
            >
              <i class="app-menu__icon bx bxs-coupon"></i>
              <span className="app-menu__label">Quản lý voucher</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 6 ? "active" : ""}`}
              onClick={() => app.setActive(6)}
              to="/order"
            >
              <i className="app-menu__icon bx bx-task"></i>
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu__item ${app.active === 7 ? "active" : ""}`}
              onClick={() => app.setActive(7)}
              to="/report"
            >
              <i className="app-menu__icon bx bx-pie-chart-alt-2"></i>
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
