import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "./axios";

// GET CATEGORY
export const getCategory = async () => {
  const response = await axiosInstance.get("/category");

  return response.data;
};

// CREATE CATEGORY
export const createCategory = async (data) => {
  const response = await axiosInstance.post("/category/create", data);

  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

// UPDATE CATEGORY
export const updateCategory = async ({ id, data }) => {
  const response = await axiosInstance.put(`/category/update/${id}`, data);

  return response.data;
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
  });
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/delete/${id}`);

  return response.data;
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "./axios";

// export const getCategory = async () => {
//   const response = await axiosInstance.get("/category");

//   return response.data;
// };
// export const createCategory = async (data) => {
//   const response = await axiosInstance.post("/category/create", data);
//   return response.data;
// };

// export const useCreateCategory = () => {
//   return useMutation({
//     mutationFn: createCategory,
//   });
// };
