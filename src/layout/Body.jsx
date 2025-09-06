import Footer from "../layout/Footer";
import NavBar from "../layout/NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
