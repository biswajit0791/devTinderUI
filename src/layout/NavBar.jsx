import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APP_BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeConnections } from "../utils/connectionSlice";

const NavBar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(APP_BASE_URL + "/logout", {
        withCredentials: true
      });
      if (res.status === 200) {
        dispatch(removeUser());
        dispatch(removeConnections());
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          🧑‍💻 DevTinder
        </Link>
      </div>
      {userData && (
        <div className="flex gap-2">
          <div className="form-control">Welcome, {userData.firstName}</div>
          <div className="dropdown dropdown-end flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
