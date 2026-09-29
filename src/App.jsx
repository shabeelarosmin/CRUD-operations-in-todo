
// import { Outlet } from "react-router-dom";

// function App() {
//   return (
//    <div className=''>
// <Outlet/>
//    </div>
//   )
// }

// export default App


import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

function App() {
  const navigate = useNavigate();

  const menuItems = [
    
    {
      key: "/items",
      label: "Items",
    },
    {
      key: "/category",
      label: "Category",
    },
    {
      key: "/todo",
      label: "Todo",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            padding: "20px",
          }}
        >
        My App
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;






















//  import React, { useEffect, useState } from "react";
// import { getItems } from "./api/itemApi";
// import { useQuery } from "@tanstack/react-query";

//  function App() {



  
//  const { data: itemData } = useQuery({
//    queryKey: ["getItems"],
//   queryFn: () => getItems(),
//    });
//    console.log({ itemData });
//   return (
//   <div className="">
//     <div className="">
//       {itemData?.data?.length > 0 ? (
//         itemData.data.map((item, index) => (
//           <div className="" key={index}>
//             name : {item.name} <br />
//             description : {item.description}
//           </div>
//         ))
//       ) : (
//         <div className="">No Data Found</div>
//       )}
//     </div>
//   </div>
// );
//  }
//  export default App

