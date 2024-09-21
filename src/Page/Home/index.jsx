import Policy from "./component/prolicy";
import background_image from "../../imgs/background.webp";
import CategoryPageHome from "./component/category";
import ProductSaleHome from "./component/hotSale";
import ProductOutstandingHome from "./component/outstanding";
import BannerHome from "./component/banner";
import NewProduct from "./component/NewProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosProducts } from "../../ReduxToolkit/sildes/ProductSlide";
import DialogProductDetail from "../../Component/Dialog/DialogProductDetail";
import DialogCart from "../../Component/Dialog/DialogCart";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.productReducer || {});
  const { isOpenProductDetail, isOpenCart } = useSelector(
    (state) => state.dialogReducer
  );

  const productSale = products?.filter(
    (product) => Number(product.product_sale) !== 0
  );

  const productOutStanding = products?.slice(0, 10);

  const productNews = products?.slice(-10);

  useEffect(() => {
    dispatch(axiosProducts({ currentPage: 1, pageSize: 100000 }));
  }, [dispatch]);

  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: `url(${background_image})`,
        }}
      >
        <div className="thumb-slider-text">
          <div className="slider-text">
            <div className="border-2 p-8 border-text_header">
              <h2 className="title">Bánh tươi mỗi ngày</h2>
              <div className="content">Giảm đến 20% khi đặt hàng qua web</div>
              <a href="/" className="button">
                Xem ngay
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div
        className="relative bg-cover bg-center min-h-72 mb-12"
        style={{
          backgroundImage: ` url(${background_image})`,
        }}
      ></div> */}

      {/* Chính sách */}
      <Policy />

      <CategoryPageHome />

      {/* Sản phẩm giảm giá */}
      <ProductSaleHome {...{ productSale }} />

      <ProductOutstandingHome {...{ productOutStanding }} />

      <BannerHome />

      <NewProduct {...{ productNews }} />

      {isOpenProductDetail && <DialogProductDetail />}
      {isOpenCart && <DialogCart />}
    </>
  );
};

export default HomePage;
