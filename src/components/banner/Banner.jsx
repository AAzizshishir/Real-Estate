import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const bannerCombo = [
  {
    title: "Live Where Your Dreams Belong",
    subtitle: " Explore Beautiful Spaces that truly feel yours",
    cta: "Start Your Journey",
    image: "https://i.ibb.co/4RtzbfZF/3d-rendering-house-model.jpg",
  },
  {
    title: "Move Smart, Live Better",
    subtitle: "Fast, modarn and trusted solutions for your next move",
    cta: "Move Start Now",
    image: "https://i.ibb.co/3yHDX9Sx/new-buildings-with-green-areas.jpg",
  },
  {
    title: "Find Your Happy Space",
    subtitle: "Discover properties that make you feel at home",
    cta: "Find Your Space",
    image: "https://i.ibb.co/JWqsBB0q/full-shot-kids-eating-cookies.jpg",
  },
];

const Banner = () => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
        {bannerCombo.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[500px] bg-center bg-cover flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <h2 className="text-4xl font-bold">{item.title}</h2>
              <p className="mt-4">{item.subtitle}</p>
              <button className="mt-6 px-6 py-2 bg-primary text-white rounded">
                {item.cta}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
