import React from "react";
import perner1 from "../../../public/partners/AA-Builders.png";
import perner2 from "../../../public/partners/Adobe-Homes.png";
import perner3 from "../../../public/partners/Ironwood-Apartments.png";
import perner4 from "../../../public/partners/Rosewood-Homes.png";
import perner5 from "../../../public/partners/The-Capital.png";

const OurPertners = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Partners of Estate Hub
        </h2>
        <p className="text-gray-700">
          We are pleased to work with our partners
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-[260px] h-[130px] p-8 shadow-md rounded-md">
          <img src={perner1} className="" alt="Our Partner" />
        </div>
        <div className="w-[260px] h-[130px] p-8 shadow-md rounded-md">
          <img src={perner2} className="" alt="Our Partner" />
        </div>
        <div className="w-[260px] h-[130px] p-8 shadow-md rounded-md">
          <img src={perner3} className="" alt="Our Partner" />
        </div>
        <div className="w-[260px] h-[130px] p-8 shadow-md rounded-md">
          <img src={perner4} className="" alt="Our Partner" />
        </div>
        <div className="w-[260px] h-[130px] p-8 shadow-md rounded-md">
          {" "}
          <img src={perner5} className="" alt="Our Partner" />
        </div>
      </div>
    </section>
  );
};

export default OurPertners;
