import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    setUser(storedData[0]);
  }, [navigate]);

  return (
    <div className="vw-100 p-3">
      <div>
        <div className="d-flex justify-content-end nav-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              localStorage.clear();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center ">
        <h1>Welcome, {user.user_firstname}</h1>
        <p>Email: {user.user_email}</p>
        <p>Phone: {user.user_phone}</p>
        <p>City: {user.user_city}</p>
      </div>
    </div>
  );
};

export default Dashboard;
