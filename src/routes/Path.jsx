import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RouteGuard from "../components/RouteGuard";
import CreateContact from "../pages/CreateContact";
import Info from "../pages/Info";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </div>
  );
};

export default Path;
