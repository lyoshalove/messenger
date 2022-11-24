import React from "react";
import { Routes, Route } from "react-router-dom";
import { pages } from "../constants/pages";

export const Router: React.FC = () => {
  return (
    <Routes>
      {pages.map(page => (
        <Route path={page.path} element={<page.element />} />
      ))}
    </Routes>
  );
}