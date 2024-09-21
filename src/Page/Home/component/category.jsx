import categoryImg1 from "../../../imgs/danhmuc_1.webp";
import categoryImg2 from "../../../imgs/danhmuc_2.webp";
import categoryImg3 from "../../../imgs/danhmuc_3.webp";
import categoryImg4 from "../../../imgs/danhmuc_4.webp";
const CategoryPageHome = () => {
  return (
    <>
      <section className="max-w-screen-xl mx-auto mb-12">
        <div className="grid grid-cols-4 gap-5">
          <div className="relative overflow-hidden max-md:col-span-2">
            <img
              src={categoryImg1}
              alt="categoryImg1"
              className="w-80 h-100 rounded-lg transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
            <h3 className="absolute left-0 right-0 bottom-0 text-2xl text-center font-playball px-2 py-3 font-extrabold bg-text_category">
              Bánh kếp
              <a
                href="/"
                className="text-base block font-medium hover:text-text_header"
              >
                Xem ngay
              </a>
            </h3>
          </div>
          <div className="relative overflow-hidden max-md:col-span-2">
            <img
              src={categoryImg2}
              alt="categoryImg2"
              className="w-80 h-100 rounded-lg transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
            <h3 className="absolute left-0 right-0 bottom-0 text-2xl text-center font-playball px-2 py-3 font-extrabold bg-text_category">
              Bánh su kem
              <a
                href="/"
                className="text-base block font-medium hover:text-text_header"
              >
                Xem ngay
              </a>
            </h3>
          </div>
          <div className="relative overflow-hidden max-md:hidden">
            <img
              src={categoryImg3}
              alt="categoryImg3"
              className="w-80 h-100 rounded-lg transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
            <h3 className="absolute left-0 right-0 bottom-0 text-2xl text-center font-playball px-2 py-3 font-extrabold bg-text_category">
              Bánh mì nướng
              <a
                href="/"
                className="text-base block font-medium hover:text-text_header"
              >
                Xem ngay
              </a>
            </h3>
          </div>
          <div className="relative overflow-hidden max-md:hidden">
            <img
              src={categoryImg4}
              alt="categoryImg4"
              className="w-80 h-100 rounded-lg transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
            <h3 className="absolute left-0 right-0 bottom-0 text-2xl text-center font-playball px-2 py-3 font-extrabold bg-text_category">
              Bánh khác
              <a
                href="/"
                className="text-base block font-medium hover:text-text_header"
              >
                Xem ngay
              </a>
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPageHome;
