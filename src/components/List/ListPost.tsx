import React from "react";
import { useRouter } from "next/router";
import { useEntityDetailHook } from "@/components/utils";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TableDataProps {
  data: any[];
}

const ListPostComponent: React.FC<TableDataProps> = ({ data }) => {
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
    <div className="mx-4 md:mx-48 mt-28 md:mt-24">
      <div className="bg-blue-900 p-6 rounded-lg mb-4">
        <h2 className="text-4xl md:text-9xl text-center py-20 font-bold text-blue-100">
          Blog Post List
        </h2>
      </div>

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
              <button
                onClick={() => handleClick(item)}
                className="bg-blue-800 text-white px-6 py-3 rounded-lg border-2 border-slate-400 hover:bg-blue-900 flex items-center gap-2"
              >
                <FaEye className="fill-white" />
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-around my-8">
        {currentPage > 1 && (
          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-slate-200 w-8 h-8 text-center content-center rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white"
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
            const buttonClass = `bg-slate-200 w-8 h-8 text-center content-center rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white ${
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
            className="bg-slate-200 w-8 h-8 text-center content-center rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            <FaChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPostComponent;
