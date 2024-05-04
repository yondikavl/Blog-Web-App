import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { deleteUser } from "@/pages/api";
import { UserType } from "../Form/interface";
import { useEntityDetailHook } from "@/components/utils";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Hero from "../Hero";

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
  const totalPages = 10;

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
      data
        .slice()
        .filter((item) => item.name.toLowerCase().includes(searchVal)),
    );
  }, [searchVal, data]);

  return (
    <div className="mx-4 mt-28 md:mx-48 md:mt-24">
      <Hero data={"User List"} />

      <div className="flex flex-col justify-between pb-8 md:flex-row">
        <button
          onClick={() => handleCreate()}
          className="mb-4 flex items-center gap-2 rounded-lg border-2 border-slate-400 bg-green-700 px-3 py-3 text-white hover:bg-green-900 md:mb-0 md:px-6 md:py-3"
        >
          <FaPlus className="fill-white" />
          Create User
        </button>
        <div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <span>Search</span>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search name"
              value={searchVal}
              className="rounded-lg border-2 px-4 py-2"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 overflow-x-scroll rounded-lg border-2 bg-slate-100 p-4">
        <table className="w-full border-2">
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
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(dataItem.id)}
                      className="rounded-lg border-2 border-slate-400 bg-red-700 px-4 py-2 text-white hover:bg-red-900"
                    >
                      <FaTrash fill="white" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(dataItem)}
                      className="rounded-lg border-2 border-slate-400 bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-900"
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

      <div className="my-8 flex justify-around">
        {currentPage > 1 && (
          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-200 hover:bg-blue-900 hover:text-white"
          >
            <FaChevronLeft />
          </div>
        )}

        {Array(totalPages)
          .fill(null)
          .map((_, i) => {
            const pageNumber = i + 1;
            const isEllipsis =
              totalPages > 5 &&
              (pageNumber < currentPage - 1 || pageNumber > currentPage + 1);
            const isActive = pageNumber === currentPage;
            const buttonClass = `bg-slate-200 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white ${
              isActive ? "bg-slate-800 text-white" : ""
            }`;

            if (isEllipsis) {
              return null;
            }

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

        {currentPage < totalPages && (
          <div
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex h-8 w-8 cursor-pointer content-center items-center justify-center rounded-lg bg-slate-200 text-center hover:bg-blue-900 hover:text-white"
          >
            <FaChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUserComponent;
