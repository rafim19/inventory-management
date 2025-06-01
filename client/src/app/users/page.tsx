"use client";

import { useGetUsersQuery } from "@/state/api";
import React from "react";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "User Id", width: 300 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 300 },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  console.log("data:", users);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        className="shadow border border-gray-200 mt-5 !text-gray-700"
        rows={users}
        columns={columns}
        getRowId={(user) => user.userId}
        checkboxSelection
      />
    </div>
  );
};

export default Users;
