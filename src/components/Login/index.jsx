import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./index.css";

const Login = () => {
  const [details, setDetails] = useState({ user_email: "", user_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitSuccess = (res) => {
    localStorage.setItem("user", JSON.stringify(res.user_data));
    navigate("/", { replace: true });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const url = "https://syoft.dev/Api/userlogin/api/userlogin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const apiResponse = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(apiResponse);
    }
  };

  return (
    <div className="bg-container">
      <form className="login-form d-flex flex-column" onSubmit={onSubmitForm}>
        <h1 className="align-self-center">Login</h1>
        <div className="input d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center input">
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              className="input-field mb-3 w-75 form-control"
              onChange={handleOnChange}
              required
            />
            <IoMdMail className="icon" />
          </div>
          <div className="d-flex justify-content-center input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="user_password"
              className="input-field mb-3 w-75 form-control"
              onChange={handleOnChange}
              required
            />
            {showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} className="icon" />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(true)}
                className="icon"
              />
            )}
          </div>
        </div>
        <p>
          Don't Have account <Link to="/signup">SignUp</Link>
        </p>
        <button type="submit" className="login-btn w-75 align-self-center p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
