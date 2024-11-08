import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//COMPONENTS
import routes from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout";
//STYLES
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route element={<DefaultLayout />}>
          {routes.map((route) => (
            <React.Fragment key={route.title}>
              {!route.dropdown ? (
                <Route path={route.path} element={route.element} />
              ) : (
                route.dropdown.map((drop, index) => (
                  <Route
                    key={drop.title + index}
                    path={drop.path}
                    element={drop.element}
                  />
                ))
              )}
            </React.Fragment>
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
