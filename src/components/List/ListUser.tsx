import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { deleteUser } from "@/pages/api";
import { UserType } from "../Form/interface";
import { useEntityDetailHook } from "@/components/utils";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

interface TableDataProps {
  data: any[];
}

const ListUserComponent: React.FC<TableDataProps> = ({ data }) => {
  const [cloneData, setCloneData] = useState(data.slice());
  const [searchVal, setSearchVal] = useState("");
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
  const router = useRouter();
  const { push, query } = router;
  const USER_COLUMNS = ["id", "name", "email", "gender", "status"];
  const header = useMemo(() => USER_COLUMNS, [USER_COLUMNS]);
  const { setSelectedUser } = useEntityDetailHook();

  const currentPage = parseInt(query.page as string, 10) || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleCreate = () => {
    push("/users/create");
  };

  const handleUpdate = (dataItem: UserType) => {
    setSelectedUser(dataItem);
    push("/users/update");
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteUser(id);
      if (result?.status === 204) {
        alert("Successfully deleted user!");
        setDeletedUserId(id);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (deletedUserId !== null) {
      const updatedData = cloneData.filter((item) => item.id !== deletedUserId);
      setCloneData(updatedData);
      setDeletedUserId(null);
    }
  }, [deletedUserId, cloneData]);

  const handlePageChange = (page: number) => {
    push({ pathname: "/users", query: { page } });
  };

  useEffect(() => {
    setCloneData(
      data.slice().filter((item) => item.name.toLowerCase().includes(searchVal))
    );
  }, [searchVal, data]);

  return (
    <div className="mx-4 md:mx-48 mt-24 md:mt-24">
      <div className="bg-blue-900 p-6 rounded-lg mb-4">
        <h2 className="text-4xl md:text-9xl text-center py-20 font-bold text-blue-100">
          User List
        </h2>
      </div>

      <div className="flex justify-between pb-8">
        <button
          onClick={() => handleCreate()}
          className="bg-green-700 text-white px-3 md:px-6 md:py-3 rounded-lg border-2 border-slate-400 hover:bg-green-900 flex items-center gap-2"
        >
          <FaPlus className="fill-white" />
          Create User
        </button>
        <div>
          <div className="flex gap-4 md:items-center flex-col md:flex-row">
            <span>Search</span>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search name"
              value={searchVal}
              className="border-2 px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-4 rounded-lg mb-4 border-2 overflow-x-scroll">
        <table className="border-2 w-full">
          <thead className="border-2 bg-slate-300">
            <tr>
              {header.map((item) => (
                <th key={item} className="border-2 py-2 capitalize">
                  {item}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border-2">
            {cloneData.map((dataItem: any) => (
              <tr key={dataItem.id} className="border-2">
                {header.map((headerItem) => {
                  return (
                    <td key={headerItem} className="border-2 p-2">
                      {dataItem[headerItem]}
                    </td>
                  );
                })}
                <td className="py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleDelete(dataItem.id)}
                      className="bg-red-700 text-white px-4 py-2 rounded-lg border-2 border-slate-400 hover:bg-red-900"
                    >
                      <FaTrash fill="white" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(dataItem)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg border-2 border-slate-400 hover:bg-yellow-900"
                    >
                      <FaEdit fill="white" />
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-around my-8">
        {Array(10)
          .fill(null)
          .map((_, i) => {
            const pageNumber = i + 1;
            const isActive = pageNumber === currentPage;
            const buttonClass = `bg-slate-200 w-8 h-8 text-center content-center rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white ${
              isActive ? "bg-slate-800 text-white" : ""
            }`;

            return (
              <div
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={buttonClass}
              >
                {pageNumber}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListUserComponent;
