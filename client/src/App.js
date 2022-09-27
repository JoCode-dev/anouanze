import React, { useEffect, useState } from "react";
import Routes from "./routes";
import Loader from "./components/Loader/Loader";
import { getUser } from "./actions/user";
import { useDispatch } from "react-redux";
import { UidContext } from "./components/AppContext";

const App = () => {
  const [onLoading, setOnLoading] = useState(true);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("jwt"));
  const userId = user?.result?._id;

  useEffect(() => {
    dispatch(getUser(userId));

    setTimeout(() => {
      setOnLoading(false);
    }, 2000);
  }, [userId]);

  return (
    <div>
      {onLoading ? (
        <Loader />
      ) : (
        <UidContext.Provider value={userId}>
          <Routes />
        </UidContext.Provider>
      )}
    </div>
  );
};

export default App;
