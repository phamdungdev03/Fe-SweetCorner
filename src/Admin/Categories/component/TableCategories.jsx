import { ButtonDelete, ButtonUpdate } from "../../../Component";
import { formatImg } from "../../../Utils/formatImage";

const TableCategories = (props) => {
  const { categories, handleShowUpdate, handleShowDelete } = props;
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
                      STT
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Số sản phẩm
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Ảnh
                    </th>
                    <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase">
                      Chức năng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories?.map((category, i) => (
                    <tr className="hover:bg-gray-100" key={i}>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {++i}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {category?.category_name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {category?.product_count} sản phẩm
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <img
                          src={formatImg(category?.category_image)}
                          alt="imageCatrgory"
                          className="h-14 w-15"
                        />
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <span onClick={() => handleShowUpdate(category)}>
                          <ButtonUpdate name={"Edit"} />
                        </span>
                        <span onClick={() => handleShowDelete(category)}>
                          <ButtonDelete name={"Delete"} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableCategories;
