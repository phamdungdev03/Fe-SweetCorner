import { GrFormNext } from "react-icons/gr";
import { ButtonCreate } from "../../../Component";
import { FaHome } from "react-icons/fa";

const HeaderProducts = ({ handleShowCreate, handleSreach }) => {
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    handleSreach(value);
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
                      Products
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
              All Products
            </h1>
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <form className="lg:pr-3">
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="Products"
                    id="Products-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Search for Products"
                    onChange={handleChangeSearch}
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <span onClick={handleShowCreate}>
                <ButtonCreate name={"Add Product"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderProducts;
