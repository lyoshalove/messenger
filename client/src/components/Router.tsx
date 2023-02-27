import React from "react";
import { Routes, Route } from "react-router-dom";
import { pages } from "@/features/constants";

export const Router: React.FC = () => {
  return (
    <Routes>
      {pages.map((page) => (
        <Route key={page.id} path={page.path} element={<page.element />} />
      ))}
    </Routes>
  );
};
