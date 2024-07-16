import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./index.css";

const Signup = () => {
  const [data, setData] = useState({
    user_firstname: "",
    user_email: "",
    user_password: "",
    user_phone: "",
    user_lastname: "Doe",
    user_city: "Hyderabad",
    user_zipcode: "500072",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const hangleOnChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmitSuccess = (msg) => {
    navigate("/login", { replace: true });
  };

  const onSubmitFailure = (err) => {
    console.log(err);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const url =
      "https://syoft.dev/Api/user_registeration/api/user_registeration";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const apiData = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(apiData.msg);
    } else {
      onSubmitFailure(apiData.error);
    }
  };

  return (
    <div className="bg-container">
      <form
        className="signup-form d-flex flex-column bg-white"
        onSubmit={onSubmitForm}
      >
        <h1 className="align-self-center">Signup</h1>
        <div className="inputs">
          <div className="d-flex justify-content-center input">
            <input
              type="text"
              className="input-field mb-4 w-75 form-control"
              placeholder="FirstName"
              name="user_firstname"
              required
              onChange={hangleOnChange}
            />
            <CgProfile className="icon" />
          </div>
          <div className=" d-flex justify-content-center input">
            <input
              type="email"
              className="input-field mb-4 w-75 form-control"
              placeholder="Email"
              name="user_email"
              required
              onChange={hangleOnChange}
            />
            <IoMdMail className="icon" />
          </div>
          <div className="d-flex justify-content-center input">
            <input
              type={showPassword ? "text" : "password"}
              className="input-field mb-4 w-75 form-control"
              placeholder="Password"
              name="user_password"
              required
              onChange={hangleOnChange}
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
          <div className="d-flex justify-content-center input">
            <input
              type="text"
              className="input-field mb-4 w-75 form-control"
              placeholder="Mobile No."
              name="user_phone"
              required
              onChange={hangleOnChange}
            />
            <FaPhone className="icon" />
          </div>
        </div>
        <p>
          Existing User <Link to="/login">Login</Link>
        </p>
        <button type="submit" className="signup-btn w-75 align-self-center p-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
