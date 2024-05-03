import Splash from "@/components/modules/Splash";
import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const splash = () => {
  return (
    <main className={`${rubik.className}`}>
      <Splash />
    </main>
  );
};

export default splash;
