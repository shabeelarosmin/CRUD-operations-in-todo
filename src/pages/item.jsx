import React, { useState } from "react";

import {
  getItems,
  useCreateItems,
  useUpdateItems,
  useDeleteItems,
} from "../api/itemApi";

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

import { getCategory } from "../api/categoryApi";

function App() {
  // GET ITEMS
  const { data: itemData, refetch } = useQuery({
    queryKey: ["getItems"],
    queryFn: () => getItems(),
  });

  // GET CATEGORY
  const { data: categoryData } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => getCategory(),
  });

  // ADD MODAL
  const [addModal, setAddModal] = useState(false);

  // EDIT MODAL
  const [editModal, setEditModal] = useState(false);

  // SELECTED ITEM
  const [selectedItem, setSelectedItem] = useState(null);

  // CREATE
  const { mutate: createItems } = useCreateItems();

  // UPDATE
  const { mutate: updateItems } = useUpdateItems();

  // DELETE
  const { mutate: deleteItems } = useDeleteItems();

  // FORM
  const [form] = Form.useForm();

  // =========================
  // CREATE ITEM
  // =========================

  const handleSubmit = (values) => {
    createItems(values, {
      onSuccess() {
        refetch();

        form.resetFields();

        setAddModal(false);

        message.success("Item added successfully");
      },

      onError() {
        message.error("Failed to add item");
      },
    });
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (record) => {
    setSelectedItem(record);

    form.setFieldsValue({
      name: record.name,
      description: record.description,
      category: record.category?._id,
    });

    setEditModal(true);
  };

  // =========================
  // UPDATE ITEM
  // =========================

  const handleUpdate = (values) => {
    updateItems(
      {
        id: selectedItem._id,
        data: values,
      },
      {
        onSuccess() {
          refetch();

          form.resetFields();

          setEditModal(false);

          setSelectedItem(null);

          message.success("Item updated successfully");
        },

        onError() {
          message.error("Failed to update item");
        },
      },
    );
  };

  // =========================
  // DELETE ITEM
  // =========================

  const handleDelete = (id) => {
    deleteItems(id, {
      onSuccess() {
        refetch();

        message.success("Item deleted successfully");
      },

      onError() {
        message.error("Failed to delete item");
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
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete Item"
            description="Are you sure you want to delete this item?"
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
      {/* ADD BUTTON */}

      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setAddModal(true);
          }}
        >
          Add Item
        </Button>
      </div>

      {/* TABLE */}

      <Table columns={columns} dataSource={itemData?.data} rowKey="_id" />

      {/* ADD MODAL */}

      <Modal
        open={addModal}
        onCancel={() => {
          setAddModal(false);
          form.resetFields();
        }}
        footer={null}
        title="Add Item"
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
            <Input placeholder="Enter item name" />
          </Form.Item>

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
            <Input.TextArea rows={4} />
          </Form.Item>

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
              options={
                categoryData?.data?.map((category) => ({
                  label: category.name,
                  value: category._id,
                })) || []
              }
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT MODAL */}

      <Modal
        open={editModal}
        onCancel={() => {
          setEditModal(false);
          form.resetFields();
          setSelectedItem(null);
        }}
        footer={null}
        title="Edit Item"
      >
        <Form layout="vertical" onFinish={handleUpdate} form={form}>
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
            <Input placeholder="Enter item name" />
          </Form.Item>

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
            <Input.TextArea rows={4} />
          </Form.Item>

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
              options={
                categoryData?.data?.map((category) => ({
                  label: category.name,
                  value: category._id,
                })) || []
              }
            />
          </Form.Item>

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
// import { getItems, useCreateItems } from "../api/itemApi";
// import { useQuery } from "@tanstack/react-query";
// import { Button, Form, Input, Modal, Select, Table, message } from  'antd';
// import { getCategory } from "../api/categoryApi";

// function App() {

//   const { data: itemData,refetch } = useQuery({
//     queryKey: ["getItems"],
//     queryFn: () => getItems(),
//   });

//   const { data: categoryData } = useQuery({
//     queryKey: ["getcategory"],
//     queryFn: () => getCategory(),
//   });

//   console.log({ itemData });

//   const [addModal,setAddModal] = useState(false)
//  const { mutate: createItems } = useCreateItems();
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

//   const handleSubmit = (values)=>{
//     console.log({values});

//     createItems(values,{
//       onSuccess(){
//         refetch()
//         form.resetFields()
//         setAddModal(false)
//         message.success("item added")
//       },
//       onError(){
//         message.error("faild")
//       }
//     })

//   }

//   return (
//     <div className="">
//       <div className="">
//         <Button type="primary" onClick={() => setAddModal(true)}>
//           Add Items
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={itemData?.data} />

//       <Modal
//         open={addModal}
//         onCancel={() => setAddModal(false)}
//         footer={null}
//         title="Add Items"
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
//                 categoryData?.data?.map((item) => ({
//                   label: item.name,
//                   value: item._id,
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
