import React from "react";

interface TableDataProps {
  data: any;
}

const Hero: React.FC<TableDataProps> = ({ data }) => {
  return (
    <div className="mb-4 rounded-lg bg-blue-900 bg-gradient-to-br from-blue-500 to-blue-900 p-6">
      <h2 className="py-20 text-center text-4xl font-bold text-blue-100 md:text-9xl">
        {data}
      </h2>
    </div>
  );
};

export default Hero;
