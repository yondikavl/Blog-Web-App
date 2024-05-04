import React from "react";

interface TableDataProps {
  data: any;
}

const Hero: React.FC<TableDataProps> = ({ data }) => {
  return (
    <div className="bg-blue-900 bg-gradient-to-br from-blue-500 to-blue-900 p-6 rounded-lg mb-4">
      <h2 className="text-4xl md:text-9xl text-center py-20 font-bold text-blue-100">
        {data}
      </h2>
    </div>
  );
};

export default Hero;
