import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./page/Body";
import Login from "./page/Login";
import Profile from "./page/Profile";
import SignUp from "./page/SignUp";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
