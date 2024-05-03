import FormUserComponent from "@/components/Form";
import { useEntityDetailHook } from "@/components/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const ModifyUserPage = () => {
  const { query } = useRouter();
  const { selectedUser } = useEntityDetailHook();
  const type = query.slug === "create" ? "create" : "update";

  return (
    <main className={`${rubik.className}`}>
      <Head>
        <title>Synap | Users</title>
      </Head>
      <FormUserComponent
        type={type}
        oldData={type === "create" ? undefined : selectedUser}
      />
    </main>
  );
};

export default ModifyUserPage;
