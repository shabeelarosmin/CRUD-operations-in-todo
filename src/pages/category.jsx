import React, { useState } from "react";

import {
  getCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../api/categoryApi";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
  Popconfirm,
  Space,
} from "antd";

function App() {
  // GET CATEGORY
  const { data: categoryData, refetch } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => getCategory(),
  });

  console.log({ categoryData });

  // ADD MODAL
  const [addModal, setAddModal] = useState(false);

  // EDIT MODAL
  const [editModal, setEditModal] = useState(false);

  // SELECTED CATEGORY
  const [selectedCategory, setSelectedCategory] = useState(null);

  // CREATE
  const { mutate: createCategory } = useCreateCategory();

  // UPDATE
  const { mutate: updateCategory } = useUpdateCategory();

  // DELETE
  const { mutate: deleteCategory } = useDeleteCategory();

  // FORM
  const [form] = Form.useForm();

  // =========================
  // CREATE CATEGORY
  // =========================

  const handleSubmit = (values) => {
    console.log({ values });

    createCategory(values, {
      onSuccess() {
        refetch();

        form.resetFields();

        setAddModal(false);

        message.success("Category added successfully");
      },

      onError() {
        message.error("Failed to add category");
      },
    });
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (record) => {
    setSelectedCategory(record);

    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });

    setEditModal(true);
  };

  // =========================
  // UPDATE CATEGORY
  // =========================

  const handleUpdate = (values) => {
    console.log("Update values:", values);

    updateCategory(
      {
        id: selectedCategory._id,
        data: values,
      },
      {
        onSuccess() {
          refetch();

          form.resetFields();

          setEditModal(false);

          setSelectedCategory(null);

          message.success("Category updated successfully");
        },

        onError() {
          message.error("Failed to update category");
        },
      },
    );
  };

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete = (id) => {
    console.log("Delete category:", id);

    deleteCategory(id, {
      onSuccess() {
        refetch();

        message.success("Category deleted successfully");
      },

      onError() {
        message.error("Failed to delete category");
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

    // {
    //   title: "Actions",
    //   key: "actions",

    //   render: (_, record) => (
    //     <Space>
    //       {/* EDIT BUTTON */}

    //       <Button type="primary" onClick={() => handleEdit(record)}>
    //         Edit
    //       </Button>

    //       {/* DELETE BUTTON */}

    //       <Popconfirm
    //         title="Delete Category"
    //         description="Are you sure you want to delete this category?"
    //         okText="Yes"
    //         cancelText="No"
    //         onConfirm={() => handleDelete(record._id)}
    //       >
    //         <Button danger>Delete</Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",

      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
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
          Add Category
        </Button>
      </div>

      {/* =========================
          CATEGORY TABLE
      ========================= */}

      <Table columns={columns} dataSource={categoryData?.data} rowKey="_id" />

      {/* =========================
          ADD CATEGORY MODAL
      ========================= */}

      <Modal
        open={addModal}
        onCancel={() => {
          setAddModal(false);

          form.resetFields();
        }}
        footer={null}
        title="Add Category"
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
            <Input placeholder="Enter category name" />
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
            <Input.TextArea rows={4} placeholder="Enter category description" />
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
          EDIT CATEGORY MODAL
      ========================= */}

      <Modal
        open={editModal}
        onCancel={() => {
          setEditModal(false);

          form.resetFields();

          setSelectedCategory(null);
        }}
        footer={null}
        title="Edit Category"
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
            <Input placeholder="Enter category name" />
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
            <Input.TextArea rows={4} placeholder="Enter category description" />
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

// import React, { useEffect, useState } from "react";
// import { getCategory, useCreateCategory } from "../api/categoryApi";
// import { useQuery } from "@tanstack/react-query";
// import { Button, Form, Input, Modal, Table, message } from "antd";

// function App() {
//   const { data: categoryData, refetch } = useQuery({
//     queryKey: ["getCategory"],
//     queryFn: () => getCategory(),
//   });
//   console.log({ categoryData });

//     const [addModal,setAddModal] = useState(false)
//     const { mutate: createCategory } = useCreateCategory();

//     const [form] = Form.useForm();

//     const columns = [
//       {
//         title: "Name",
//         dataIndex: "name",
//         key: "name",
//       },
//       {
//         title: "Description",
//         dataIndex: "description",
//         key: "description",
//       },

//     ];

//     const handleSubmit = (values) => {
//       console.log({ values });

//       createCategory(values, {
//         onSuccess() {
//           refetch();
//           form.resetFields();
//           setAddModal(false);
//           message.success("Category added");
//         },

//         onError() {
//           message.error("Failed");
//         },
//       });
//     };
//   return (
//     <div className="">
//       <div className="">
//         <Button type="primary" onClick={() => setAddModal(true)}>
//           Add Category
//         </Button>
//       </div>
//       <Table columns={columns} dataSource={categoryData?.data} />
//       <Modal
//         open={addModal}
//         onCancel={() => setAddModal(false)}
//         footer={null}
//         title="Add Categorys"
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
