import React from "react";
//API
import { useGetTasksQuery } from "@/redux/api/endpoints/tasksApi";
//COMPONENTS
import ErrorAlert from "@/components/common/ErrorAlert";
import Loading from "@/components/common/Loading";
import TasksList from "@/components/Tasks/TasksList";

const Tasks = () => {
  const [sortStatus, setStatus] = React.useState<string>("");
  const {
    data: getTasks,
    error: errorTasks,
    isLoading: loadingTasks,
  } = useGetTasksQuery({ status: sortStatus });

  return (
    <div className="p-3">
      {errorTasks ? (
        <ErrorAlert text="Помилка! Не знайдено жодного завдання." />
      ) : loadingTasks ? (
        <Loading />
      ) : (
        <TasksList tasks={getTasks ?? []} setStatus={setStatus} />
      )}
    </div>
  );
};

export default Tasks;
