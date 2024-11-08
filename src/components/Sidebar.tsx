import React from "react";
import { Link, NavLink } from "react-router-dom";
//IMG
import routes from "@/routes/routes";

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div
      className={`drawer ${openSidebar ? "drawer-open" : ""} lg:drawer-open`}
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4 gap-1">
          <li className="mb-2 font-bold text-2xl">
            <Link
              to="/"
              className="flex items-center hover:bg-transparent active:bg-transparent"
            >
              Task Manager
            </Link>
          </li>
          {routes.map((route, index) => (
            <React.Fragment key={route.title + index}>
              {!route.dropdown ? (
                <li>
                  <NavLink
                    to={route.path}
                    className={`${route.title === "" ? "hidden" : ""}`}
                    onClick={() => setOpenSidebar(false)}
                  >
                    {route.icon &&
                      React.createElement(route.icon, {
                        className: "icon-class",
                      })}
                    {route.title}
                  </NavLink>
                </li>
              ) : (
                <li>
                  <details>
                    <summary>
                      {route.icon &&
                        React.createElement(route.icon, {
                          className: "icon-class",
                        })}
                      {route.title}
                    </summary>
                    <ul className="flex flex-col gap-1 mt-1">
                      {route.dropdown.map((drop) => (
                        <li key={drop.title}>
                          <NavLink
                            to={drop.path}
                            onClick={() => setOpenSidebar(false)}
                          >
                            {drop.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
