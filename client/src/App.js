import React, { useEffect, useState } from "react";
import Routes from "./routes";
import Loader from "./components/Loader/Loader";
import { getUser } from "./actions/user";
import { useDispatch } from "react-redux";
import { UidContext } from "./components/AppContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

  const GOOGLE_CLIENT_ID =
    "204343189133-r0sop34kjle3b4286ko64mj4t0ddm5av.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        {onLoading ? (
          <Loader />
        ) : (
          <UidContext.Provider value={userId}>
            <Routes />
          </UidContext.Provider>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
