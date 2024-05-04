import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Footer = () => {
  return (
    <main className={`${rubik.className}`}>
      <div className="bg-blue-800 h-40 mt-20 flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Synap App</h1>
        <p className="text-white mt-4">Develop by Yondika Vio Landa</p>
      </div>
    </main>
  );
};

export default Footer;
