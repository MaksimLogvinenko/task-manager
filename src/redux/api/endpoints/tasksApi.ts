import { api } from "../api";
//TYPES
import { Task } from "@/types/types";

interface GetTasksParams {
  status?: string;
}

interface EditTaskParams {
  id: string;
  file?: string | File;
  title: string;
  text: string;
  status: string;
}

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksParams>({
      query: ({ status = "" }) => {
        const params: Record<string, string> = {};
        if (status) params.status = status;
        return {
          url: "/tasks",
          params,
        };
      },
      providesTags: ["Tasks"],
    }),

    getTaskId: builder.query<Task, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation<Task, EditTaskParams>({
      query: ({ id, file, title, text, status }) => ({
        url: "/tasks",
        method: "POST",
        body: { id, file, title, text, status },
      }),
      invalidatesTags: ["Tasks"],
    }),

    editTask: builder.mutation<Task, EditTaskParams>({
      query: ({ id, file, title, text, status }) => {
        return {
          url: `/tasks/${id}`,
          method: "PUT",
          body: { file, title, text, status },
        };
      },
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<Task, { id: string }>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskIdQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
