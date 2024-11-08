import React from "react";
import { Outlet } from "react-router-dom";
//COMPONENTS
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const DefaultLayout = () => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  return (
    <>
      <div className="flex items-start">
        <div className="max-w-max">
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </div>
        <div className="flex flex-col w-full">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
