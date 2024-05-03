import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaQuoteRight } from "react-icons/fa";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      router.push({ pathname: "/blogs", query: { page: 1 } });
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="bg-blue-800 h-screen w-screen text-center content-center">
      <h1 className="flex justify-center items-center font-bold text-white text-2xl gap-4">
        <FaQuoteRight className="fill-white" />
        Synap App
      </h1>
    </div>
  );
};

export default Splash;
