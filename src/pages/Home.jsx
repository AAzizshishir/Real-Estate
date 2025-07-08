import Advertisement from "../components/advertisement/Advertisement";
import Banner from "../components/banner/Banner";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <Banner></Banner>
      <div className="max-w-7xl">
        <Advertisement></Advertisement>
      </div>
    </div>
  );
};

export default Home;
