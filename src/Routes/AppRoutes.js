import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../Components/Users/Users";
import UserProfile from "../Components/UserProfile/UserProfile";
import NoMatch from "../Components/NoMatch/NoMatch";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" default element={<Users />} />
          <Route path="/users/:UserName" default element={<UserProfile />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
