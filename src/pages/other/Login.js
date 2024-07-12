import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import "../../css/main.css";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const app = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (app.login && app.login?.username && app.login?.password) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("a");
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (username === "admin" && password === "123") {
      app.handleLogin(username, password);
      window.location.href = "/";
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt">
            <img src={require("../../images/team.jpg")} alt="IMG" />
          </div>
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">
              <b>ĐĂNG NHẬP HỆ THỐNG </b>
            </span>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Tài khoản quản trị"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="bx bx-user"></i>
              </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                autocomplete="off"
                className="input100"
                type="password"
                placeholder="Mật khẩu"
                name="current-password"
                id="password-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="bx fa-fw bx-hide field-icon click-eye"></span>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="bx bx-key"></i>
              </span>
            </div>
            <div className="container-login100-form-btn">
              <button type="submit" className="btn-login" onclick={handleSubmit}>
                Đăng nhập
              </button>
            </div>
            <div className="text-right p-t-12 mt-3">
              <a className="txt2" href="/forgot.html">
                Bạn quên mật khẩu?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
