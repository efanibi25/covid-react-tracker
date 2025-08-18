import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import for React Router v6+

// pages for this product
import NewsPage from "views/newsPage/newsPage.js";
import MapPage from "views/mapPage/mapPage.js";
import TablePage from "views/tablePage/tablePage.js";

// Create a browser router for React Router v6+
const router = createBrowserRouter([
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/tables",
    element: <TablePage />,
  },
  {
    path: "/",
    element: <MapPage />,
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);