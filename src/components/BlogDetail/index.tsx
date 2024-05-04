import React from "react";
import { useRouter } from "next/router";
import { FaArrowLeft, FaCommentAlt, FaUserCircle } from "react-icons/fa";

export interface BlogDetailProps {
  commentsData: any[];
  userData: any;
  postDetails: any;
}

const BlogDetails: React.FC<BlogDetailProps> = ({
  commentsData,
  userData,
  postDetails,
}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="mx-4 md:mx-48 mt-28 md:mt-24 bg-slate-100 border-2 p-4 rounded-lg">
      <div>
        <button
          onClick={handleBack}
          className="bg-blue-800 text-white px-6 py-3 rounded-lg border-2 border-slate-400 hover:bg-blue-900 flex items-center gap-2"
        >
          <FaArrowLeft className="fill-white" />
          Back
        </button>
      </div>
      <div>
        <div>
          <div className="my-4">
            <h3 className="text-2xl font-bold">
              {postDetails?.title ?? "Title not found!"}
            </h3>
            <div className="flex gap-4">
              <p className="text-slate-400">
                Post ID: {postDetails?.id ?? "Post ID not found!"}
              </p>
              <p className="text-slate-400">
                User ID: {postDetails?.user_id ?? "User  ID not found!"}
              </p>
            </div>
          </div>
          <div className="my-4">
            <p className="text-justify">
              {postDetails?.body ?? "Description not found!"}
            </p>
          </div>
        </div>

        <h5 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaCommentAlt />
          Comment
        </h5>
        <div className="bg-slate-100 border-2 p-4 rounded-lg">
          {commentsData?.length ? (
            <div>
              {commentsData.map((item) => (
                <div key={item.id} className="mt-4">
                  <p className="font-bold text-lg flex flex-col gap-2">
                    <span className="flex items-center gap-2">
                      <FaUserCircle />
                      {item.name}{" "}
                    </span>
                    <span className="text-slate-400 font-normal text-sm">
                      ({item.email})
                    </span>
                  </p>
                  <p className="mt-2">{item.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No comment in this post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
