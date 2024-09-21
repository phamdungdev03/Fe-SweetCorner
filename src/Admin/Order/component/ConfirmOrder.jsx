import { format, parseISO } from "date-fns";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = ({ handleShowUpdate, handleShowDelete, confirmOrder }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy h:mm a");
  };

  const handleClickDetail = (id) => {
    navigate(`/admin/order/detail`, { state: { id } });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                CUSTOMER
              </th>
              <th scope="col" className="px-6 py-3">
                PRODUCT
              </th>
              <th scope="col" className="px-6 py-3">
                ORDER DATE
              </th>
              <th scope="col" className="px-6 py-3">
                AMOUNT
              </th>
              <th scope="col" className="px-6 py-3">
                PAYMENT METHOD
              </th>
              <th scope="col" className="px-6 py-3">
                DELIVERY STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {confirmOrder.map((order, i) => {
              return (
                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.account_name}</td>
                  <td className="px-6 py-4">
                    {order.products.map((product, index) => (
                      <div key={index}>
                        {product.product_name} (x{product.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{formatDate(order?.order_date)}</td>
                  <td className="px-6 py-4">
                    {Number(order.total_amount).toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-4">{order?.payment_method}</td>
                  <td className="px-6 py-4">{order?.delivery_status}</td>
                  <td className="flex items-center px-6 h-full py-7 gap-2">
                    <span onClick={() => handleClickDetail(order.order_id)}>
                      <FaEye size={17} color="#2e86c1" />
                    </span>
                    <span onClick={() => handleShowUpdate(order.order_id)}>
                      <MdEdit size={17} color="#b9770e" />
                    </span>
                    <span onClick={() => handleShowDelete(order.order_id)}>
                      <RiDeleteBin6Fill size={17} color="#CD5C5C" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConfirmOrder;
