import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//API
import { useDeleteTaskMutation } from "@/redux/api/endpoints/tasksApi";
//TYPES
import { TasksItemProps } from "@/types/types";
//IMG
import { FaDownload } from "react-icons/fa";

const CardDetail: React.FC<TasksItemProps> = ({ task }) => {
  const navigate = useNavigate();
  const [deleteTask] = useDeleteTaskMutation();

  const downloadFile = () => {
    const fileData = task.file;

    if (fileData) {
      const link = document.createElement("a");
      const mimeType = fileData.split(";")[0].split(":")[1];
      let extension = "";

      switch (mimeType) {
        case "image/png":
          extension = "png";
          break;
        case "image/jpeg":
          extension = "jpg";
          break;
        case "text/plain":
          extension = "txt";
          break;
        case "application/pdf":
          extension = "pdf";
          break;

        default:
          extension = "bin";
          break;
      }

      link.href = fileData;
      link.download = `file.${extension}`;
      link.click();
    } else {
      alert("Файл не найден!");
    }
  };

  const handleDelete = async () => {
    await deleteTask({ id: task.id }).then(async (data) => {
      console.log(data);
      toast.success("Завдання успішно видалено!");
      navigate("/");
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Статус:{" "}
          <span
            className={`${
              task.status === "success" ? "text-green-600" : "text-yellow-500"
            }`}
          >
            {task.status === "success" ? "Виконано" : "В роботі"}
          </span>
        </h2>
        <h2 className="card-title">{task.title}</h2>
        <p>{task.text}</p>
        <button type="button" onClick={downloadFile} className="btn max-w-max">
          Скачати файл
          <FaDownload />
        </button>
        <div className="card-actions justify-end">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-error"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
