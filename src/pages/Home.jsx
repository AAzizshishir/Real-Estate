import Faq from "../components/accordian/Faq";
import Advertisement from "../components/advertisement/Advertisement";
import Banner from "../components/banner/Banner";
import OurPertners from "../components/ourpertners/OurPertners";
import Review from "../components/review/Review";
import TopAgent from "../components/topagent/TopAgent";
import WhyChooseUs from "../components/whychooseus/WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-background text-black">
      {/* Banner */}
      <Banner />
      <div className="px-4 lg:px-10">
        <Advertisement />
        <Review />
        <WhyChooseUs />
        <TopAgent />
        <OurPertners />
        <Faq />
      </div>
    </div>
  );
};

export default Home;
