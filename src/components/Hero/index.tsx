import React from "react";

const Hero = ({ pageName }: { pageName: string }) => {
  return (
    <div className="mb-4 rounded-lg bg-blue-900 bg-gradient-to-br from-blue-500 to-blue-900 p-6">
      <h2 className="py-20 text-center text-4xl font-bold text-blue-100 md:text-9xl">
        {pageName}
      </h2>
    </div>
  );
};

export default Hero;
