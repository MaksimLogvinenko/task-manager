import React from "react";
import { Link } from "react-router-dom";
import ThemeController from "./common/ThemeController";
//IMG
import { FaPlus } from "react-icons/fa";

interface NavbarProps {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="navbar bg-base-100 shadow px-5">
      <div className="flex-1">
        <button
          type="button"
          onClick={() => setOpenSidebar(!openSidebar)}
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <ThemeController />
        <Link to="/tasks/add">
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
