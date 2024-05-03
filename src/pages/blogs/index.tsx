import React, { useEffect, useState } from "react";
import { getPost } from "../api";
import { ListPostComponent } from "@/components/List";
import { useRouter } from "next/router";
import Head from "next/head";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Blogs = () => {
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
    <main className={`${rubik.className}`}>
      <Head>
        <title>Synap | Blogs</title>
      </Head>
      <ListPostComponent data={data} />
    </main>
  );
};

export default Blogs;
