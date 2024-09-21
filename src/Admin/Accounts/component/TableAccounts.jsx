import { format } from "date-fns";
import {
  ButtonDelete,
  ButtonUpdate,
  SimplePagination,
} from "../../../Component";
import { formatImg } from "../../../Utils/formatImage";

const TableAccounts = (props) => {
  const {
    handleShowUpdate,
    handleShowDelete,
    accounts,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage,
    totalPages,
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
                    {/* <th scope="col" className="p-4"></th> */}
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Position
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone Number
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      CreateAt
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase">
                      Chức năng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts?.map((account, i) => (
                    <tr className="hover:bg-gray-100" key={i}>
                      {/* <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                          />
                        </div>
                      </td> */}
                      <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={formatImg(account.user_image)}
                          alt="avatar"
                        />
                        <div className="text-sm font-normal text-gray-500">
                          <div className="text-base font-semibold text-gray-900">
                            {account.user_name}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            {account.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {account.role_name.charAt(0).toUpperCase() +
                          account.role_name.slice(1)}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {account.phone_number}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {format(new Date(account.created_at), "dd/MM/yyyy")}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full mr-2 bg-green-400"></div>
                          Active
                        </div>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <span onClick={() => handleShowUpdate(account)}>
                          <ButtonUpdate name={"Edit"} />
                        </span>
                        <span onClick={() => handleShowDelete(account)}>
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

export default TableAccounts;
