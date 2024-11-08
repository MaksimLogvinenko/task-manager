import { TaskListProps } from "@/types/types";
import React from "react";

const FilterButton: React.FC<TaskListProps> = ({ setStatus }) => {
  return (
    <div className="flex justify-end dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Сортувати по
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li onClick={() => setStatus("")}>
          <a>All</a>
        </li>
        <li onClick={() => setStatus("success")}>
          <a>Success</a>
        </li>
        <li onClick={() => setStatus("pending")}>
          <a>Pending</a>
        </li>
      </ul>
    </div>
  );
};

export default FilterButton;
