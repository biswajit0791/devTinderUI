import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./layout/Body";
import Login from "./page/Login";
import Profile from "./page/Profile";
import SignUp from "./page/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./page/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
