const features = [
  {
    id: 1,
    icon: "🏠", // Later you can replace with HeroIcons or Lucide icons
    title: "Best Property Lists",
    description:
      "We provide consumers with content-rich listings in a handy format.",
  },
  {
    id: 2,
    icon: "👍",
    title: "Best Price in Market",
    description:
      "Price estimates and sales histories for property, updating information.",
  },
  {
    id: 3,
    icon: "🏅",
    title: "Guaranteed Services",
    description:
      "Our managers will keep you informed and you can act with certainty.",
  },
  {
    id: 4,
    icon: "📈",
    title: "Marketing Research",
    description:
      "Our marketing researchers today have a tough job multitasking.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="relative py-16 px-4 md:px-8 bg-cover bg-center text-white mt-20"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/SxSbzM41/jason-dent-w3e-Fhq-Xjk-ZE-unsplash.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Why Choose Us</h2>
        <p className="text-gray-300">
          We offer more than just property listings
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center"
          >
            <div className="border-2 border-primary w-16 h-16 flex items-center justify-center transform rotate-45 mb-4 hover:bg-primary duration-300">
              <div className="-rotate-45 text-2xl">{feature.icon}</div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
