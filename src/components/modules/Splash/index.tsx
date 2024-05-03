import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      router.push({ pathname: "/blogs", query: { page: 1 } });
    }, 1500);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="bg-blue-800 h-screen w-screen text-center content-center">
      <h1 className="flex justify-center items-center font-bold text-white text-2xl gap-4">
        Synap Blog
      </h1>
    </div>
  );
};

export default Splash;
