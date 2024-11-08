import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//API
import {
  useCreateTaskMutation,
  useGetTasksQuery,
} from "@/redux/api/endpoints/tasksApi";
//TYPES
import { Task } from "@/types/types";
//IMG
import { MdArrowBackIosNew } from "react-icons/md";

const AddTasks = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = React.useState<Task>({
    id: "",
    file: "",
    title: "",
    text: "",
    status: "pending",
  });
  const { data: getTasks, isLoading: loadingTasks } = useGetTasksQuery({
    status: "",
  });
  const [createTask] = useCreateTaskMutation();
  const tasks = getTasks || [];

  React.useEffect(() => {
    !loadingTasks &&
      setNewTask((prev) => ({ ...prev, id: (tasks.length + 1).toString() }));
  }, [getTasks]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewTask((prevState) => ({
          ...prevState,
          file: reader.result as string,
        }));
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

  const handleCreateTask = async () => {
    await createTask(newTask).then(async (data) => {
      console.log(data);
      toast.success("Завдання успішно відправлено!");
      navigate("/");
    });
  };

  return (
    <div className="p-3">
      <Link to="/">
        <MdArrowBackIosNew className="text-3xl mb-4" />
      </Link>
      <div className="flex flex-col gap-3">
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
          onClick={handleCreateTask}
          className="btn btn-outline max-w-xs"
        >
          Створити завдання
        </button>
      </div>
    </div>
  );
};

export default AddTasks;
