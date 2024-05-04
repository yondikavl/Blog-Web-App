import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Footer = () => {
  return (
    <main className={`${rubik.className}`}>
      <div className="mt-20 flex h-40 flex-col items-center justify-center bg-blue-800">
        <h1 className="text-2xl font-bold text-white">Synap App</h1>
        <p className="mt-4 text-white">Develop by Yondika Vio Landa</p>
      </div>
    </main>
  );
};

export default Footer;
