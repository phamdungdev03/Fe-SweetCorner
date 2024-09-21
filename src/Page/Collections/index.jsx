import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosProducts } from "../../ReduxToolkit/sildes/ProductSlide";
import { CardProduct, SimplePagination } from "../../Component";
import DialogProductDetail from "../../Component/Dialog/DialogProductDetail";
import DialogCart from "../../Component/Dialog/DialogCart";
import SortProducts from "./component/SortProducts";
import CategoryPageHome from "../Home/component/category";
import background_image from "../../imgs/breadcrumb.webp";
import title from "../../imgs/title.webp";
import ListFilterCollections from "./component/ListFilter";
import { GrFormNext } from "react-icons/gr";

const Collections = () => {
  const dispatch = useDispatch();
  const { products, currentPage, pageSize, totalPages } = useSelector(
    (state) => state?.productReducer || {}
  );
  const { isOpenProductDetail, isOpenCart } = useSelector(
    (state) => state.dialogReducer
  );

  const [sortOption, setSortOption] = useState("Tên A-Z");
  const [filters, setFilters] = useState({});

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleFilterChange = (newFilters) => {
    // Kiểm tra giá trị mới của bộ lọc
    console.log("New Filters: ", newFilters);
    setFilters(newFilters);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(
        axiosProducts({
          currentPage: currentPage + 1,
          pageSize,
          sortOption,
          ...filters,
        })
      );
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(
        axiosProducts({
          currentPage: currentPage - 1,
          pageSize,
          sortOption,
          ...filters,
        })
      );
    }
  };

  const handlePageClick = (page) => {
    dispatch(
      axiosProducts({
        currentPage: page,
        pageSize,
        sortOption,
        ...filters,
      })
    );
  };

  useEffect(() => {
    dispatch(axiosProducts({ currentPage, pageSize, sortOption, ...filters }));
  }, [dispatch, currentPage, pageSize, sortOption, filters]);

  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-96 mb-12"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[200px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-5xl m text-text_header font-playball font-semibold">
                Tất cả sản phẩm
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center">
                <li className="text-white flex gap-2 items-center hover:text-text_header">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">
                  Tất cả sản phẩm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CategoryPageHome />

      <div className="max-w-screen-xl mx-auto mb-12">
        <h3 className="flex flex-col items-center text-5xl font-playball font-medium mb-11">
          <a href="/" className="hover:text-text_header">
            Tất cả sản phẩm
          </a>
          <img src={title} alt="title" className="mt-4" />
        </h3>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 max-md:hidden">
            <ListFilterCollections handleFilterChange={handleFilterChange} />
          </div>
          <div className="col-span-9 max-md:col-span-12">
            <SortProducts
              handleSortChange={handleSortChange}
              currentSort={sortOption}
            />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {products?.map((product, i) => (
                <div key={i} className="col-span-1">
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
            </div>

            <div className="bg-white sm:flex items-center w-full sm:justify-center bottom-0 right-0 border-t border-gray-200 p-4">
              <div className="flex items-center mb-4 sm:mb-0"></div>
              <div className="flex items-center space-x-3">
                <SimplePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenProductDetail && <DialogProductDetail />}
      {isOpenCart && <DialogCart />}
    </>
  );
};

export default Collections;
