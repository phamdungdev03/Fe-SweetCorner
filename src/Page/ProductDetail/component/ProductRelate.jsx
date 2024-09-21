import Slider from "react-slick/lib/slider";
import { CardProduct, NextArrow, PrevArrow } from "../../../Component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosProducts } from "../../../ReduxToolkit/sildes/ProductSlide";
import title from "../../../imgs/title.webp";

const ProductRelate = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.productReducer || {});

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(axiosProducts({ currentPage: 1, pageSize: 100000 }));
  }, [dispatch]);

  return (
    <>
      <section className="max-w-screen-xl mx-auto mb-12 mt-24">
        <div className="p-2 rounded-lg">
          <h3 className="flex flex-col items-center text-5xl font-playball font-medium mb-2">
            <a href="/" className="hover:text-text_header">
              Sản phẩm liên quan
            </a>
            <img src={title} alt="title" className="mt-4" />
          </h3>

          <div className="slider-container mt-12">
            <Slider {...settings}>
              {products.map((product, i) => (
                <div className="px-2" key={i}>
                  <CardProduct
                    {...{
                      product_id: product.product_id,
                      productImg: product?.default_image,
                      product_name: product?.product_name,
                      product_price: product?.product_price,
                      product_sale: product?.product_sale,
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductRelate;
