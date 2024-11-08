import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//API
import { useDeleteTaskMutation } from "@/redux/api/endpoints/tasksApi";
//TYPES
import { TasksItemProps } from "@/types/types";
//IMG
import { MdDelete } from "react-icons/md";

const TasksItem: React.FC<TasksItemProps> = ({ task }) => {
  const navigate = useNavigate();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    await deleteTask({ id: task.id }).then(async (data) => {
      console.log(data);
      toast.success("Завдання успішно видалено!");
      navigate("/");
    });
  };

  return (
    <tr>
      <th>{task.id}</th>
      <td className="underline">
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </td>
      <td className="line-clamp-3 sm:line-clamp-none">{task.text}</td>
      <td>
        <div
          className={`badge ${
            task.status === "success" ? "badge-success" : "badge-warning"
          } gap-2`}
        >
          {task.status}
        </div>
      </td>
      <td>
        <button
          type="button"
          onClick={() => navigate(`/tasks/edit/${task.id}`)}
          className="btn btn-sm"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={handleDelete}
          className="btn btn-sm btn-outline btn-error"
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default TasksItem;
