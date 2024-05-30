import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setToken } from "../store/LoginSlice";
const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setToken({ username: "", token: "" }));
    toast.success("Successfully logged out!");
    setTimeout(() => {
      navigate("/login");
    }, 2000); // 
  }, [dispatch, navigate]);

  return <div></div>;
};

export default LogoutPage;
