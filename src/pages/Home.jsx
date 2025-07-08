import Advertisement from "../components/advertisement/Advertisement";
import Banner from "../components/banner/Banner";
import Review from "../components/review/Review";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <Banner></Banner>
      <div className="max-w-7xl">
        <Advertisement></Advertisement>
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
