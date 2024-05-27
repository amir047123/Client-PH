//app.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home";
import { PublicRoutes } from "./Routes/PublicRoutes";
import { UserRoutes } from "./Routes/UserRoutes";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import RequireAuth from "./RequireAuth/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          {PublicRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
       

        {/* User Routes */}
        <Route path="/user-dashboard" element={<RootLayout />}>
          <Route
            index
            element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            }
          />
          {UserRoutes.map(({ path, Component }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <RequireAuth>
                  <Component />
                </RequireAuth>
              }
            />
          ))}
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
