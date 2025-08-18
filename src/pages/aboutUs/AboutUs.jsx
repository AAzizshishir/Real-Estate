// import { motion } from "motion/react";
import { FaAward, FaStar, FaUserCheck } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { GoGoal } from "react-icons/go";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

const AboutUs = () => {
  return (
    <section className="mt-20 min-h-screen">
      <div className="bg-[url(https://i.postimg.cc/YC7CGSqn/urban-traffic-with-cityscape-1.jpg)] w-full h-[240px] bg-cover bg-center bg-no-repeat object-cover relative">
        <div className="absolute bg-black/50 inset-0"></div>
        <h2 className="text-5xl md:text-6xl font-bold text-white pl-10 pt-10 md:pl-20 md:pt-20 z-50 relative">
          About Our Company
        </h2>
        <p className="text-white relative z-50 pl-10 md:pl-20 pt-4">
          Connecting People with Places — Where Trust Meets Opportunity in Every
          Property
        </p>
      </div>

      <div className="my-16 px-4 lg:px-10">
        <h2 className="text-center font-medium text-4xl md:text-5xl pb-4 max-w-[600px] mx-auto">
          Your Reliable Partner In Real Estate Success
        </h2>
        <div className="bg-[url(https://i.postimg.cc/NMr1Gx42/business-talks-conference-table-1.jpg)] h-[550px] bg-cover bg-center bg-no-repeat object-cover rounded-md relative">
          <div className="bg-white rounded-md p-3 md:p-6 inline-block absolute right-5 bottom-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-4xl md:text-6xl font-medium">96</span>
              <FaAward className="text-3xl md:text-5xl" />
            </div>
            <p className="text-lg md:text-2xl mt-2 font-medium text-gray-700">
              Awards Received
            </p>
          </div>
          <div className="bg-white rounded-md p-3 md:p-6 inline-block absolute bottom-35 right-5 md:bottom-45">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-6xl font-medium">62</span>
              <FaUserCheck className="text-3xl md:text-5xl" />
            </div>
            <p className="text-lg md:text-2xl mt-2 font-medium text-gray-700">
              Satisfied Clients
            </p>
          </div>
        </div>

        {/* Mission & Vission */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GiQueenCrown className="text-4xl" />
              <h3 className="text-3xl font-medium">Our Mission</h3>
            </div>
            <p className="text-gray-600">
              To simplify the real estate journey by connecting people with the
              right properties through trust, transparency, and technology.
            </p>
            <p className="text-gray-600 mt-2">
              {" "}
              We are committed to delivering personalized experiences, whether
              you're buying, selling, or renting. We embrace new technologies
              and market trends to deliver smarter, faster, and more efficient
              property solutions.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GoGoal className="text-4xl" />
              <h3 className="text-3xl font-medium">Our Vision</h3>
            </div>
            <p className="text-gray-600">
              To become the most trusted real estate partner by redefining how
              people discover, evaluate, and engage with properties.
            </p>
            <p className="text-gray-600 mt-2">
              {" "}
              We envision a future where every individual can find their ideal
              home or investment with confidence, supported by innovation,
              integrity, and a deep understanding of market needs.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="my-16">
          <h2 className="text-center font-medium text-4xl md:text-5xl pb-4 max-w-[600px] mx-auto">
            Our Story
          </h2>
          <p className="text-gray-700">
            Founded with a passion for real estate and community, our journey
            began with a simple goal: to make property decisions easier and more
            meaningful. Today, we serve clients across the region with
            personalized service and deep market insight.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
