import React from "react";
import { useRouter } from "next/router";
import { useEntityDetailHook } from "@/components/utils";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Hero from "../Hero";

const ListPostComponent = ({ data }: { data: any }) => {
  const { push, query } = useRouter();
  const { setPostDetails } = useEntityDetailHook();
  const handleClick = (item: any) => {
    push(`/blogs/detail/${item.id}`);
    setPostDetails(item);
  };

  const currentPage = parseInt(query.page as string, 10) || 1;
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    push({ pathname: "/blogs", query: { page } });
  };

  return (
    <div className="mx-4 mt-28 md:mx-48 md:mt-24">
      <Hero pageName={"Blog Post List"} />

      <div className="flex flex-wrap justify-around">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="mb-4 w-screen rounded-lg border-2 bg-slate-100 p-8"
          >
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="my-4 line-clamp-3 text-justify">{item.body}</p>
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="text-slate-400">Post ID: {item.id}</p>
                <p className="text-slate-400">User ID: {item.user_id}</p>
              </div>
              <button
                onClick={() => handleClick(item)}
                className="flex items-center gap-2 rounded-lg border-2 border-slate-400 bg-blue-800 px-6 py-3 text-white hover:bg-blue-900"
              >
                <FaEye className="fill-white" />
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="my-8 flex justify-around">
        {currentPage > 1 && (
          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex h-8 w-8 cursor-pointer content-center items-center justify-center rounded-lg bg-slate-200 text-center hover:bg-blue-900 hover:text-white"
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

export default ListPostComponent;
