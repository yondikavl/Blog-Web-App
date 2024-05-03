import React from "react";
import { TableDataProps } from "./interface";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";

const ListPost: React.FC<TableDataProps> = ({ data }) => {
  const { push, query } = useRouter();

  const currentPage = parseInt(query.page as string, 10) || 1;

  const handlePageChange = (page: number) => {
    push({ pathname: "/blogs", query: { page } });
  };

  return (
    <div className="mx-4 md:mx-48 mt-16 md:mt-20">
      <h2 className="text-5xl text-center py-20 font-bold">Blog Post List</h2>

      <div className="flex flex-wrap justify-around">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-slate-100 w-screen p-8 rounded-lg mb-4 border-2"
          >
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="line-clamp-3 text-justify my-4">{item.body}</p>
            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-slate-400">Post ID: {item.id}</p>
                <p className="text-slate-400">User ID: {item.user_id}</p>
              </div>
              <button className="bg-blue-800 text-white px-6 py-3 rounded-lg border-2 border-slate-400 hover:bg-blue-900 flex items-center gap-2">
                <FaEye className="fill-white" />
                Detail
              </button>
            </div>
          </div>
        ))}
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

export default ListPost;
