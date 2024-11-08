import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
//API
import { useGetTaskIdQuery } from "@/redux/api/endpoints/tasksApi";
//TYPES
import { Task } from "@/types/types";
//COMPONENTS
import ErrorAlert from "@/components/common/ErrorAlert";
import Loading from "@/components/common/Loading";
import CardDetail from "@/components/Tasks/CardDetail";
//IMG
import { MdArrowBackIosNew } from "react-icons/md";

const DetailTask = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : undefined;
  const [task, setTask] = React.useState<Task>({
    id: "",
    file: "",
    title: "",
    text: "",
    status: "success",
  });
  const {
    data: getTaskId,
    error: errorTaskId,
    isLoading: loadingTaskId,
  } = taskId !== undefined
    ? useGetTaskIdQuery(taskId)
    : { data: undefined, error: null, isLoading: false };

  React.useEffect(() => {
    if (getTaskId) {
      setTask(getTaskId);
    }
  }, [getTaskId]);

  return (
    <div className="p-3">
      <Link to="/">
        <MdArrowBackIosNew className="text-3xl mb-4" />
      </Link>
      {errorTaskId ? (
        <ErrorAlert text="Помилка! Не знайдено жодного завдання." />
      ) : loadingTaskId ? (
        <Loading />
      ) : (
        <CardDetail task={task} />
      )}
    </div>
  );
};

export default DetailTask;
