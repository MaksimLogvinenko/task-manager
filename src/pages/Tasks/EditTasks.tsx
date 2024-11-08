import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
//API
import {
  useGetTaskIdQuery,
  useEditTaskMutation,
} from "@/redux/api/endpoints/tasksApi";
//TYPES
import { Task } from "@/types/types";
//COMPONENTS
import ErrorAlert from "@/components/common/ErrorAlert";
import Loading from "@/components/common/Loading";
//IMG
import { MdArrowBackIosNew } from "react-icons/md";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : undefined;
  const [newTask, setNewTask] = React.useState<Task>({
    id: "",
    file: "",
    title: "",
    text: "",
    status: "",
  });
  const [check, setCheck] = React.useState<boolean>(false);
  const {
    data: getTaskId,
    error: errorTaskId,
    isLoading: loadingTaskId,
  } = taskId !== undefined
    ? useGetTaskIdQuery(taskId)
    : { data: undefined, error: null, isLoading: false };
  const [editTask] = useEditTaskMutation();

  React.useEffect(() => {
    if (!loadingTaskId && getTaskId) {
      setNewTask(getTaskId);
      setCheck(getTaskId.status === "success" ? true : false);
    }
  }, [getTaskId, loadingTaskId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewTask({
        ...newTask,
        file: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewTask({
            ...newTask,
            file: reader.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTask = async () => {
    const updatedTask = { ...newTask, status: check ? "success" : "pending" };

    await editTask(updatedTask).then(async (data) => {
      console.log(data);
      toast.success("Редагування завдання успішно завершено!");
      navigate("/");
    });
  };

  return (
    <div className="p-3">
      {errorTaskId ? (
        <ErrorAlert text="Помилка! Не знайдено жодного завдання." />
      ) : loadingTaskId ? (
        <Loading />
      ) : (
        <>
          <Link to="/">
            <MdArrowBackIosNew className="text-3xl mb-4" />
          </Link>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <h2>
                Статус:{" "}
                <div
                  className={`badge ${
                    check === true ? "badge-success" : "badge-warning"
                  } gap-2`}
                >
                  {check ? "success" : "pending"}
                </div>
              </h2>

              <input
                type="checkbox"
                className="toggle toggle-lg"
                checked={check}
                onChange={() => setCheck(!check)}
              />
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleFileChange}
            />
            <input
              type="text"
              placeholder="Заголовок"
              className="input input-bordered w-full"
              name="title"
              value={newTask.title}
              onChange={onChangeInput}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Опис"
              rows={7}
              name="text"
              value={newTask.text}
              onChange={onChangeInput}
            ></textarea>
            <button
              type="button"
              onClick={handleEditTask}
              className="btn btn-outline max-w-xs"
            >
              Обновити завдання
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditTask;
