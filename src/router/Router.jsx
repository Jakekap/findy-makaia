import { createContext, useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/login/Login";
import Feed from "../pages/feed/Feed";
import Profile from "../pages/profile/Profile";
import Post from "../pages/post/Post";
import { initialUser, userReducer } from "../reducer/userReducer";
import Layout from "../pages/layout/Layout";
import { getSession } from "../services/storageService";
import NewPublication from "../pages/newPublication/main.jsx";

export const AppContext = createContext({});

const Router = () => {
  const [userLogin, userDispatch] = useReducer(userReducer, initialUser);
  const globalState = {
    user: {
      userLogin,
      userDispatch,
    },
  };

  useEffect(() => {
    const user = getSession();
    if (user?.name) {
      userDispatch({
        type: "login",
        payload: {
          isAuthenticated: true,
          user: user,
        },
      });
    }
  }, []);

  return (
    <AppContext.Provider value={globalState}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              element={
                <PublicRouter isAuthenticated={userLogin.isAuthenticated} />
              }
            >
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              element={
                <PrivateRouter isAuthenticated={userLogin.isAuthenticated} />
              }
            >
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Feed />} />
                <Route path=":idProfile" element={<Profile />} />
                <Route path=":idProfile/:idPost" element={<Post />} />
                <Route path="newPub" element={<NewPublication />} />
                <Route path="inPost" element={<Post />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;
