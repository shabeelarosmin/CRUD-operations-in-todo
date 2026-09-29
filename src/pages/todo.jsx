
import React, { useState } from "react";

import {
  getTodo,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../api/todoApi";

import { getCategory } from "../api/categoryApi";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
  Popconfirm,
  Space,
} from "antd";

function App() {
  // =========================
  // GET TODO
  // =========================

  const { data: todoData, refetch } = useQuery({
    queryKey: ["getTodo"],
    queryFn: () => getTodo(),
  });

  // =========================
  // GET CATEGORY
  // =========================

  const { data: categoryData } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => getCategory(),
  });

  console.log({ todoData });
  console.log({ categoryData });

  // =========================
  // ADD MODAL
  // =========================

  const [addModal, setAddModal] = useState(false);

  // =========================
  // EDIT MODAL
  // =========================

  const [editModal, setEditModal] = useState(false);

  // =========================
  // SELECTED TODO
  // =========================

  const [selectedTodo, setSelectedTodo] = useState(null);

  // =========================
  // CREATE
  // =========================

  const { mutate: createTodo } = useCreateTodo();

  // =========================
  // UPDATE
  // =========================

  const { mutate: updateTodo } = useUpdateTodo();

  // =========================
  // DELETE
  // =========================

  const { mutate: deleteTodo } = useDeleteTodo();

  // =========================
  // FORM
  // =========================

  const [form] = Form.useForm();

  // =========================
  // CREATE TODO
  // =========================

  const handleSubmit = (values) => {
    console.log("Create values:", values);

    createTodo(values, {
      onSuccess() {
        refetch();

        form.resetFields();

        setAddModal(false);

        message.success("Todo added successfully");
      },

      onError(error) {
        console.log(error);

        message.error("Failed to add todo");
      },
    });
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (record) => {
    console.log("Edit todo:", record);

    setSelectedTodo(record);

    form.setFieldsValue({
      name: record.name,
      description: record.description,
      category: record.category?._id,
    });

    setEditModal(true);
  };

  // =========================
  // UPDATE TODO
  // =========================

  const handleUpdate = (values) => {
    console.log("Update values:", values);

    updateTodo(
      {
        id: selectedTodo._id,
        data: values,
      },
      {
        onSuccess() {
          refetch();

          form.resetFields();

          setEditModal(false);

          setSelectedTodo(null);

          message.success("Todo updated successfully");
        },

        onError(error) {
          console.log(error);

          message.error("Failed to update todo");
        },
      },
    );
  };

  // =========================
  // DELETE TODO
  // =========================

  const handleDelete = (id) => {
    console.log("Delete todo:", id);

    deleteTodo(id, {
      onSuccess() {
        refetch();

        message.success("Todo deleted successfully");
      },

      onError(error) {
        console.log(error);

        message.error("Failed to delete todo");
      },
    });
  };

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },

    {
      title: "Actions",
      key: "actions",

      render: (_, record) => (
        <Space>
          {/* EDIT */}

          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          {/* DELETE */}

          <Popconfirm
            title="Delete Todo"
            description="Are you sure you want to delete this todo?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* =========================
          ADD BUTTON
      ========================= */}

      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();

            setAddModal(true);
          }}
        >
          Add Todo
        </Button>
      </div>

      {/* =========================
          TODO TABLE
      ========================= */}

      <Table columns={columns} dataSource={todoData?.data} rowKey="_id" />

      {/* =========================
          ADD TODO MODAL
      ========================= */}

      <Modal
        open={addModal}
        onCancel={() => {
          setAddModal(false);

          form.resetFields();
        }}
        footer={null}
        title="Add Todo"
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          {/* NAME */}

          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input placeholder="Enter todo name" />
          </Form.Item>

          {/* DESCRIPTION */}

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter todo description" />
          </Form.Item>

          {/* CATEGORY */}

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Category is required",
              },
            ]}
          >
            <Select
              placeholder="Select category"
              options={
                categoryData?.data?.map((category) => ({
                  label: category.name,
                  value: category._id,
                })) || []
              }
            />
          </Form.Item>

          {/* SUBMIT */}

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* =========================
          EDIT TODO MODAL
      ========================= */}

      <Modal
        open={editModal}
        onCancel={() => {
          setEditModal(false);

          form.resetFields();

          setSelectedTodo(null);
        }}
        footer={null}
        title="Edit Todo"
      >
        <Form layout="vertical" onFinish={handleUpdate} form={form}>
          {/* NAME */}

          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input placeholder="Enter todo name" />
          </Form.Item>

          {/* DESCRIPTION */}

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter todo description" />
          </Form.Item>

          {/* CATEGORY */}

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Category is required",
              },
            ]}
          >
            <Select
              placeholder="Select category"
              options={
                categoryData?.data?.map((category) => ({
                  label: category.name,
                  value: category._id,
                })) || []
              }
            />
          </Form.Item>

          {/* UPDATE */}

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;




// import React, { useState } from "react";

// import { useQuery } from "@tanstack/react-query";

// import { Button, Form, Input, Modal, Select, Table, message } from "antd";

// import { getTodo, useCreateTodo } from "../api/todoApi";
// import { getCategory } from "../api/categoryApi";

// function App() {
//   const { data: todoData, refetch } = useQuery({
//     queryKey: ["getTodo"],
//     queryFn: () => getTodo(),
//   });

//   const { data: categoryData } = useQuery({
//     queryKey: ["getCategory"],
//     queryFn: () => getCategory(),
//   });

//   console.log({ todoData });
//   console.log({ categoryData });

//   const [addModal, setAddModal] = useState(false);

//   const { mutate: createTodo } = useCreateTodo();

//   const [form] = Form.useForm();

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Category",
//       dataIndex: ["category", "name"],
//       key: "category",
//     },
//   ];

//   const handleSubmit = (values) => {
//     console.log({ values });

//     createTodo(values, {
//       onSuccess() {
//         refetch();
//         form.resetFields();
//         setAddModal(false);
//         message.success("Todo added");
//       },

//       onError(error) {
//         console.log(error);
//         message.error("Failed");
//       },
//     });
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={() => setAddModal(true)}>
//         Add Todo
//       </Button>

//       <Table columns={columns} dataSource={todoData?.data} rowKey="_id" />

//       <Modal
//         open={addModal}
//         onCancel={() => setAddModal(false)}
//         footer={null}
//         title="Add Todo"
//       >
//         <Form layout="vertical" onFinish={handleSubmit} form={form}>
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[
//               {
//                 required: true,
//                 message: "Name is required",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               {
//                 required: true,
//                 message: "Description is required",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="category"
//             label="Category"
//             rules={[
//               {
//                 required: true,
//                 message: "Category is required",
//               },
//             ]}
//           >
//             <Select
//               options={
//                 categoryData?.data?.map((category) => ({
//                   label: category.name,
//                   value: category._id,
//                 })) || []
//               }
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button htmlType="submit" type="primary">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default App;

