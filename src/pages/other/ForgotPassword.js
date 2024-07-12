import React from "react";
import "../../css/main.css";

const ForgotPassword = () => {
  return (
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img src={require("../../images/fg-img.png")} alt="IMG" />
          </div>
          <form class="login100-form validate-form">
            <span class="login100-form-title">
              <b>KHÔI PHỤC MẬT KHẨU</b>
            </span>
            <form action="custommer.html">
              <div class="wrap-input100 validate-input" data-validate="Bạn cần nhập đúng thông tin như: ex@abc.xyz">
                <input
                  class="input100"
                  type="text"
                  placeholder="Nhập email"
                  name="emailInput"
                  id="emailInput"
                  value=""
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="bx bx-mail-send"></i>
                </span>
              </div>
              <div class="container-login100-form-btn">
                <input type="button" value="Lấy mật khẩu" />
              </div>
              <div class="p-t-12 mt-3">
                <a class="txt2" href="/login">
                  Trở về đăng nhập
                </a>
              </div>
            </form>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
