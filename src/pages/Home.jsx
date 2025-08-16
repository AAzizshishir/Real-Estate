import Advertisement from "../components/advertisement/Advertisement";
import Banner from "../components/banner/Banner";
import Review from "../components/review/Review";
import TopAgent from "../components/topagent/TopAgent";
import WhyChooseUs from "../components/whychooseus/WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-background text-black">
      {/* Banner */}
      <Banner></Banner>
      <div className="max-w-7xl mx-auto">
        <Advertisement></Advertisement>
        <Review></Review>
        <WhyChooseUs></WhyChooseUs>
        <TopAgent></TopAgent>
      </div>
    </div>
  );
};

export default Home;
