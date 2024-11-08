import React from "react";
//API

//TYPES
import { TaskListProps } from "@/types/types";
//COMPONENTS
import TasksItem from "./TasksItem";
import FilterButton from "../common/FilterButton";

const TasksList: React.FC<TaskListProps> = ({ tasks, setStatus }) => {
  return (
    <>
      <FilterButton setStatus={setStatus} tasks={tasks} />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TasksItem key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TasksList;
