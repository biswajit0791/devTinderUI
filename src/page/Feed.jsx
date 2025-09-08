import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(APP_BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  const sendRequest = async (status, userId) => {
    await axios.post(
      `${APP_BASE_URL}/request/send/${status}/${userId}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserFromFeed({ userId }));
    status === "interested" && setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return <h1 className="flex justify-center my-10"> No User Found!!</h1>;
  return (
    <>
      {feed && (
        <div className="flex justify-center my-10">
          <UserCard
            key={feed[0]._id}
            user={feed[0]}
            handleSendRequest={sendRequest}
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Conection request sent successfully!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
