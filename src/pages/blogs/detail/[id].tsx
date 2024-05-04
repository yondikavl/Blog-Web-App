import BlogDetails from "@/components/modules/BlogDetail";
import { useEntityDetailHook } from "@/components/utils";
import { getPostComments, getPostUser } from "@/pages/api";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const DetailBlog = () => {
  const { postDetails } = useEntityDetailHook();
  const [commentsData, setCommentsData] = useState([] as any[]);
  const [userData, setUserData] = useState({});
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (id) {
        const postId = Number(id);
        const commentsData = await getPostComments(postId);
        const userData = await getPostUser(postDetails?.user_id);
        setCommentsData(commentsData);
        setUserData(userData);
      }
    };

    fetchPostDetails();
  }, [id, postDetails?.user_id]);

  const props = {
    commentsData,
    userData,
    postDetails,
  };

  return (
    <main className={`${rubik.className}`}>
      <Head>
        <title>Synap | Blog Details</title>
      </Head>
      <BlogDetails {...props} />
    </main>
  );
};

export default DetailBlog;
