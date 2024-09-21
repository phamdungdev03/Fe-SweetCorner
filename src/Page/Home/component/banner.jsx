import bannerHome from "../../../imgs/banner.webp";

const BannerHome = () => {
  return (
    <>
      <section className="mb-12 max-w-screen-xl mx-auto">
        <a href="/" className="overflow-hidden relative block">
          <img
            src={bannerHome}
            alt=""
            className="max-w-full h-auto transition-transform duration-1000 ease-in-out transform hover:scale-105"
          />
        </a>
      </section>
    </>
  );
};

export default BannerHome;
