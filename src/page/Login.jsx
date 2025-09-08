import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignupPage, setIsSignupPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${APP_BASE_URL}/login`,
        {
          emailId,
          password
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Something went wrong!!");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${APP_BASE_URL}/signup`,
        {
          emailId,
          password,
          firstName,
          lastName
        },
        { withCredentials: true }
      );
      setIsSignupPage(false);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isSignupPage ? "Signup" : "Login"}</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {isSignupPage && (
              <>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isSignupPage ? handleSignup : handleLogin}>
              {isSignupPage ? "Signup" : "Login"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer"
            onClick={() => setIsSignupPage((value) => !value)}>
            {isSignupPage
              ? "Existing User? Login Here"
              : "New User? Signup Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
