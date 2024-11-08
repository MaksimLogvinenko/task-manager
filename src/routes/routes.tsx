import React from "react";
import { IconType } from "react-icons";
//COMPONENTS
import Tasks from "@/pages/Tasks";
import AddTasks from "@/pages/Tasks/AddTasks";
import EditTask from "@/pages/Tasks/EditTasks";
import DetailTask from "@/pages/Tasks/DetailTask";
//IMG
import { FaPlus, FaTasks } from "react-icons/fa";

interface DropdownRoute {
  title: string;
  path: string;
  element: React.ReactNode;
}

interface Route {
  title: string;
  path: string;
  element: React.ReactNode;
  icon?: IconType;
  dropdown?: DropdownRoute[];
}

const routes: Route[] = [
  {
    title: "Список задач",
    path: "/",
    element: <Tasks />,
    icon: FaTasks,
  },
  {
    title: "Додати задачу",
    path: "/tasks/add",
    element: <AddTasks />,
    icon: FaPlus,
  },
  {
    title: "",
    path: "/tasks/edit/:id",
    element: <EditTask />,
  },
  {
    title: "",
    path: "/tasks/:id",
    element: <DetailTask />,
  },
];

export default routes;
