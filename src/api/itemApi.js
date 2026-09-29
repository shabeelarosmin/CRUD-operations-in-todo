import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "./axios";

// =========================
// GET ITEMS
// =========================

export const getItems = async () => {
  const response = await axiosInstance.get("/item");

  return response.data;
};

// =========================
// CREATE ITEM
// =========================

export const createItems = async (data) => {
  const response = await axiosInstance.post("/item/create", data);

  return response.data;
};

export const useCreateItems = () => {
  return useMutation({
    mutationFn: createItems,
  });
};

// =========================
// UPDATE ITEM
// =========================

export const updateItems = async ({ id, data }) => {
  const response = await axiosInstance.put(`/item/update/${id}`, data);

  return response.data;
};

export const useUpdateItems = () => {
  return useMutation({
    mutationFn: updateItems,
  });
};

// =========================
// DELETE ITEM
// =========================

export const deleteItems = async (id) => {
  const response = await axiosInstance.delete(`/item/delete/${id}`);

  return response.data;
};

export const useDeleteItems = () => {
  return useMutation({
    mutationFn: deleteItems,
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "./axios";

// export const getItems = async () => {
//   const response = await axiosInstance.get("/item");

//   return response.data;
// };

// export const createItems = async (data) => {
//   const response = await axiosInstance.post("/item/create",data);

//   return response.data;
// };

// export const useCreateItems = ()=>{
//   return useMutation({
//        mutationFn:createItems
//   })
// }
