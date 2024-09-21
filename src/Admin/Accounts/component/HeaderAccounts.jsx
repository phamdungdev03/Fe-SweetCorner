import { GrFormNext } from "react-icons/gr";
import { ButtonCreate, ButtonExport } from "../../../Component";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";
import ExportToExcel from "../../../Utils/exportToExcel";
import { axiosAccounts } from "../../../ReduxToolkit/sildes/AccountSlide";

const HeaderAccounts = (props) => {
  const dispatch = useDispatch();
  const { handleShowCreate, handleSreach } = props;
  const { accounts } = useSelector((state) => state?.accountReducer || {});

  const handleExport = async () => {
    await dispatch(axiosAccounts({ currentPage: 1, pageSize: 1000 }));
    const newAccounts = accounts.map(
      ({ password, account_role_id, role_id, ...rest }) => rest
    );
    ExportToExcel(newAccounts, "AccountsData");
  };

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    handleSreach(searchValue);
  };

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="text-gray-700 hover:text-gray-900 inline-flex gap-2 items-center"
                  >
                    <FaHome />
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <GrFormNext />
                    <a
                      href="/"
                      className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                    >
                      Users
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <GrFormNext />
                    <span
                      className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                      aria-current="page"
                    >
                      List
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              All Accounts
            </h1>
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <form className="lg:pr-3">
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="users-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Search for users"
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <span onClick={handleShowCreate}>
                <ButtonCreate name={"Add user"} />
              </span>
              <span onClick={handleExport}>
                <ButtonExport />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAccounts;
