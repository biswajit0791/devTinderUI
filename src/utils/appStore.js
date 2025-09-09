import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import feedReducer from "../utils/feedSlice";
import connectionReducer from "../utils/connectionSlice";
import requestReducer from "../utils/requestSlice";
import postReducer from "../utils/postSlice";
import postsSaga from "../utils/postSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestReducer,
    posts: postReducer
  },
  middleware: (getDefault) =>
    getDefault({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(postsSaga);

export default appStore;
