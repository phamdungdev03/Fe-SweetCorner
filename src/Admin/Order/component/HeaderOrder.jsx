import { FaHome } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { ButtonCreate } from "../../../Component";

const HeaderOrder = ({ handleShowCreate }) => {
  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex" aria-label="Breadcrumb">
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
                      Orders
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
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <h2 className="font-medium">Order History</h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <span onClick={handleShowCreate}>
                <ButtonCreate name={"Create Order"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderOrder;
