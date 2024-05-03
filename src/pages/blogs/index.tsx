import ListPost from "@/components/elements/List/ListPost";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getPost } from "../api";
import { useRouter } from "next/router";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const blogs = () => {
  const [data, setData] = useState<any[]>([]);
  const { query } = useRouter();
  const page = query.page;

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof page === "string") {
        const pageNumber = parseInt(page);
        if (!isNaN(pageNumber)) {
          const postData = await getPost(pageNumber);
          setData(postData);
        }
      }
    };

    fetchPost();
  }, [page]);

  return (
    <>
      <Head>
        <title>Synap | Blogs</title>
      </Head>
      <main className={`${rubik.className}`}>
        <ListPost data={data} />
      </main>
    </>
  );
};

export default blogs;
