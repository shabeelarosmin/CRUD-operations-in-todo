import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "./axios";

// =========================
// GET TODO
// =========================

export const getTodo = async () => {
  const response = await axiosInstance.get("/todo");

  return response.data;
};

// =========================
// CREATE TODO
// =========================

export const createTodo = async (data) => {
  const response = await axiosInstance.post("/todo/create", data);

  return response.data;
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: createTodo,
  });
};

// =========================
// UPDATE TODO
// =========================

export const updateTodo = async ({ id, data }) => {
  const response = await axiosInstance.put(`/todo/update/${id}`, data);

  return response.data;
};

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: updateTodo,
  });
};

// =========================
// DELETE TODO
// =========================

export const deleteTodo = async (id) => {
  const response = await axiosInstance.delete(`/todo/delete/${id}`);

  return response.data;
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: deleteTodo,
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "./axios";

// export const getTodo = async () => {
//   const response = await axiosInstance.get("/todo");

//   return response.data;
// };

// export const createTodo = async (data) => {
//   const response = await axiosInstance.post("/todo/create", data);

//   return response.data;
// };

// export const useCreateTodo = () => {
//   return useMutation({
//     mutationFn: createTodo,
//   });
// };
