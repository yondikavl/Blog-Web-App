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
    <div className="flex h-screen items-center justify-center bg-blue-800">
      <h1 className="flex items-center justify-center gap-4 text-2xl font-bold text-white">
        <FaQuoteRight className="fill-white" />
        Synap App
      </h1>
    </div>
  );
};

export default Splash;
