import { AiTwotoneDelete } from "react-icons/ai";
import { RatingStar, SimplePagination } from "../../../Component";
import { formatImg } from "../../../Utils/formatImage";
import { CiEdit } from "react-icons/ci";
const TableProducts = (props) => {
  const {
    products,
    handleShowUpdate,
    handleShowDelete,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    totalPages,
    currentPage,
  } = props;

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating Star
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      price
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Sale
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      details
                    </th>
                    <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product, i) => (
                    <tr className="hover:bg-gray-100" key={i}>
                      <td className="flex items-center p-4 gap-4 mr-12 lg:mr-0">
                        <img
                          className="h-12 w-15 rounded-md"
                          src={formatImg(product?.default_image)}
                          alt="img"
                        />
                        <div className="text-sm font-sm text-gray-900">
                          {product?.product_name}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900">
                        {product.category_name}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900">
                        <div className="flex">
                          {RatingStar(product.rating_star)}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900">
                        {`${Number(product.product_price).toLocaleString()}đ`}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 max-w-52 ">
                        <div className="line-clamp-3">
                          {product.product_sale}%
                        </div>
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 max-w-52 ">
                        <div className="line-clamp-3">
                          {product.product_detail}
                        </div>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleShowUpdate(product.product_id)}
                          className="text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm inline-flex items-center px-3
                           py-2 text-center"
                        >
                          <CiEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShowDelete(product.product_id)}
                          className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-100 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <AiTwotoneDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Phân Trang */}
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
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
    </>
  );
};

export default TableProducts;
