import Statistical from "./component/Statistical";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HomeDashBoard = () => {
  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 7000 },
    { name: "May", sales: 2000 },
    { name: "Jun", sales: 3000 },
  ];

  const topProductsData = [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/50", // Thay bằng đường dẫn thật của ảnh sản phẩm
      price: 120000, // giá sản phẩm
      orders: 150, // tổng số đơn hàng
      totalRevenue: 18000000, // tổng tiền bán được
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/50",
      price: 250000,
      orders: 100,
      totalRevenue: 25000000,
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://via.placeholder.com/50",
      price: 75000,
      orders: 75,
      totalRevenue: 5625000,
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://via.placeholder.com/50",
      price: 50000,
      orders: 50,
      totalRevenue: 2500000,
    },
  ];
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-gray-100 p-6">
        <Statistical />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-1 md:col-span-8 bg-white p-5 rounded-lg shadow-md">
            <h3 className="font-semibold mb-5">Sales Overview</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 bg-white p-5 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Top Products</h3>
            <ul>
              {topProductsData.map((product) => (
                <li key={product.id} className="mb-4 flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">
                      Price: {formatCurrency(product.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Orders: {product.orders} orders
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Revenue: {formatCurrency(product.totalRevenue)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeDashBoard;
