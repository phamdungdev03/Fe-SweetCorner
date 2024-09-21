import title from "../../../imgs/title.webp";
import { CardProduct, NextArrow, PrevArrow } from "../../../Component";
import React from "react";
import Slider from "react-slick";

const ProductSaleHome = (props) => {
  const { productSale } = props;
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

  return (
    <>
      <section className="max-w-screen-xl mx-auto mb-12">
        <div className="p-2 border-4 border-text_header rounded-lg">
          <h3 className="flex flex-col items-center text-5xl font-playball font-medium mb-2">
            <a href="/" className="hover:text-text_header">
              Bánh đang giảm giá
            </a>
            <img src={title} alt="title" className="mt-4" />
          </h3>
          <div className="text-base text-center bg-transparent mb-8">
            <h3>
              Chương trình đã kết thúc, hẹn gặp lại trong thời gian sớm nhất!
            </h3>
          </div>

          <div className="slider-container">
            <Slider {...settings}>
              {productSale.map((product, i) => (
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

export default ProductSaleHome;
