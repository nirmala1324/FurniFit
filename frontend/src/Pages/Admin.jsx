import React from "react";
import Table from "../Component/Admin/Table";
import { Forms } from "../Component/Admin/Forms";

const Admin = () => {
  return (
    <>
      <div className="bg-red-400 w-full h-[100vh] flex">
        <div className="bg-transparent w-[25%]"></div>
        <div className="bg-white w-[75%]">
          <Table />
          <Forms />
        </div>
      </div>
    </>
  );
};

export default Admin;
