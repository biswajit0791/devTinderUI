import Footer from "../layout/Footer";
import NavBar from "../layout/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(APP_BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
