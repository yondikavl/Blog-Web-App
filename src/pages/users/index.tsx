import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import { ListUserComponent } from "@/components/List";
import Head from "next/head";
import { useRouter } from "next/router";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Users = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof page === "string") {
        const pageNumber = parseInt(page);
        if (!isNaN(pageNumber)) {
          const userData = await getUsers(pageNumber);
          setData(userData);
        }
      }
    };

    fetchData();
  }, [page]);

  return (
    <main className={`${rubik.className}`}>
      <Head>
        <title>Synap | Users</title>
      </Head>
      <ListUserComponent data={data} />
    </main>
  );
};

export default Users;
