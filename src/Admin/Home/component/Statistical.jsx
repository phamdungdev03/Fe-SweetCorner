import { FaUsers } from "react-icons/fa";
import { TbActivity, TbAffiliateFilled, TbBrandFeedly } from "react-icons/tb";

const Statistical = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Users */}
      <div className="relative p-5 bg-white rounded-lg shadow-md transform transition-transform duration-500 hover:translate-y-1">
        <div>
          <h2 className="font-medium text-gray-500">Users</h2>
          <span className="text-3xl mt-6 mb-3 inline-block">28.05k</span>
        </div>
        <div className="absolute top-8 right-12 bg-[#E6F7FC] w-12 h-12 flex justify-center items-center rounded-full">
          <FaUsers size={28} color="#58CAEA" />
        </div>
      </div>

      {/* Sales */}
      <div className="relative p-5 bg-white rounded-lg shadow-md transform transition-transform duration-500 hover:translate-y-1">
        <div>
          <h2 className="font-medium text-gray-500">Sales</h2>
          <span className="text-3xl mt-6 mb-3 inline-block">$120k</span>
        </div>
        <div className="absolute top-8 right-12 bg-[#E6F7FC] w-12 h-12 flex justify-center items-center rounded-full">
          <TbActivity size={28} color="#58CAEA" />
        </div>
      </div>

      {/* Orders */}
      <div className="relative p-5 bg-white rounded-lg shadow-md transform transition-transform duration-500 hover:translate-y-1">
        <div>
          <h2 className="font-medium text-gray-500">Orders</h2>
          <span className="text-3xl mt-6 mb-3 inline-block">$120k</span>
        </div>
        <div className="absolute top-8 right-12 bg-[#E6F7FC] w-12 h-12 flex justify-center items-center rounded-full">
          <TbAffiliateFilled size={28} color="#58CAEA" />
        </div>
      </div>

      {/* Products */}
      <div className="relative p-5 bg-white rounded-lg shadow-md transform transition-transform duration-500 hover:translate-y-1">
        <div>
          <h2 className="font-medium text-gray-500">Products</h2>
          <span className="text-3xl mt-6 mb-3 inline-block">$120k</span>
        </div>
        <div className="absolute top-8 right-12 bg-[#E6F7FC] w-12 h-12 flex justify-center items-center rounded-full">
          <TbBrandFeedly size={28} color="#58CAEA" />
        </div>
      </div>
    </section>
  );
};

export default Statistical;
