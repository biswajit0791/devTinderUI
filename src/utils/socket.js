import io from "socket.io-client";
import { APP_BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(APP_BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
