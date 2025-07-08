import Advertisement from "../components/advertisement/Advertisement";
import Banner from "../components/banner/Banner";
import Review from "../components/review/Review";
import WhyChooseUs from "../components/whychooseus/WhyChooseUs";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <Banner></Banner>
      <div className="max-w-7xl">
        <Advertisement></Advertisement>
        <Review></Review>
        <WhyChooseUs></WhyChooseUs>
      </div>
    </div>
  );
};

export default Home;
