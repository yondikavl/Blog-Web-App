import Splash from "@/components/Splash";
import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const SplashPage = () => {
  return (
    <main className={`${rubik.className}`}>
      <Splash />
    </main>
  );
};

export default SplashPage;
