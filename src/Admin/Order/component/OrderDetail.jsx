import { GrFormNext } from "react-icons/gr";
import { Player } from "@lordicon/react";
import ICON from "../../../Assets/delivery.json";
import { useEffect, useRef } from "react";
import {
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
  MdOutlinePlace,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosOrderById } from "../../../ReduxToolkit/sildes/OrderSlide";
import { formatImg } from "../../../Utils/formatImage";
import { RatingStar } from "../../../Component";
import { axiosAccountById } from "../../../ReduxToolkit/sildes/AccountSlide";
import { FaShippingFast } from "react-icons/fa";

function PlayOnce() {
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return <Player ref={playerRef} icon={ICON} size={100} />;
}
const OrderDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const { orderById } = useSelector((state) => state.orderReducer || {});
  const { accountById } = useSelector((state) => state?.accountReducer || {});

  const orderDetail = orderById[0];
  const accountId = orderDetail?.account_id;

  useEffect(() => {
    dispatch(axiosOrderById({ id }));
  }, [dispatch, id, accountId]);

  useEffect(() => {
    dispatch(axiosAccountById({ accountId }));
  }, [dispatch, accountId]);
  const ship = 20000;

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <h2 className="font-medium">Order Details</h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li>
                    <div className="flex items-center">
                      <span className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">
                        Ecommerce
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <GrFormNext />
                      <span
                        className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                        aria-current="page"
                      >
                        Order Details
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 min-h-screen px-2 md:px-4 py-4 ">
        <div className="grid grid-cols-12 gap-6">
          {/* Order Details Table */}
          <div className="col-span-12 md:col-span-9 bg-white">
            <div className="bg-white p-4 font-semibold">
              <h3>Order #{orderDetail?.order_id}</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Product Details
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Item Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-3 text-end">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {orderDetail?.products.map((product, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <div className="flex items-center">
                          <div className="h-16 w-16 p-1 bg-light">
                            <img
                              src={formatImg(product?.default_image)}
                              alt="default_image"
                              className="h-full w-full object-cover rounded-md"
                            />
                          </div>
                          <div className="ml-2">
                            <h5 className="text-base font-medium text-blue-400">
                              {product?.product_name}
                            </h5>
                          </div>
                        </div>
                      </th>
                      <td className="px-4">
                        {Number(product.product_price).toLocaleString()} VNĐ
                      </td>
                      <td className="px-4">{product.quantity} sản phẩm</td>
                      <td className="px-4">
                        <div className="flex items-center ">
                          {RatingStar(product.rating_star)}
                        </div>
                      </td>
                      <td className="font-semibold text-end px-4">
                        {Number(
                          product.quantity * product.product_price
                        ).toLocaleString()}{" "}
                        VNĐ
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td colSpan="3"></td>
                    <td colSpan="2">
                      <table className="w-full text-sm font-semibold">
                        <tbody>
                          <tr>
                            <td className="px-4 py-4">Sub Total :</td>
                            <td className="text-end px-4">
                              {Number(
                                orderDetail?.total_amount
                              ).toLocaleString()}{" "}
                              VNĐ
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4">Shipping Charge :</td>
                            <td className="text-end px-4">
                              {Number(ship).toLocaleString()} VNĐ
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4">Total (VNĐ) :</td>
                            <td className="text-end px-4">
                              {Number(
                                Number(orderDetail?.total_amount) + Number(ship)
                              ).toLocaleString()}{" "}
                              VNĐ
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 ">
            <div className="grid grid-rows-12 gap-4 h-full">
              <div className="row-span-5 bg-white">
                <div className="p-3 text-base font-medium border-b-2">
                  <div className="flex gap-2 items-center">
                    <FaShippingFast />
                    <h3>Logistics Details</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    <PlayOnce />
                    <h5 className="text-base font-semibold">RQK Logistics</h5>
                    <h5 className="text-sm">ID: #{orderDetail?.order_id}</h5>
                    <h5 className="text-sm">
                      Payment Mode : {orderDetail?.payment_method}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row-span-4 bg-white">
                <div className="flex justify-between items-center p-3 text-base font-medium border-b-2">
                  <h3>Customer Details</h3>
                  <p className="text-xs">View Profile</p>
                </div>
                <div className="p-4">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <div className="flex ">
                        <div className="flex-shrink-0">
                          <img
                            src={formatImg(accountById?.user_image)}
                            alt=""
                            className="w-12 h-12 rounded"
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="text-base font-semibold mb-1">
                            {accountById?.user_name}
                          </h5>
                          <h5 className="text-sm">{accountById?.role_name}</h5>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center gap-2">
                      <MdOutlineMailOutline />
                      <h5 className="text-sm">{accountById?.email}</h5>
                    </li>
                    <li className="flex items-center gap-2">
                      <MdOutlineLocalPhone />
                      <h5 className="text-sm">{accountById?.phone_number}</h5>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row-span-3 bg-white">
                <div className="flex justify-between max-md:justify-center items-center p-3 text-base font-medium border-b-2">
                  <div className="flex gap-2 items-center">
                    <MdOutlinePlace />
                    <h3>Billing Address</h3>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="flex flex-col gap-2 max-md:items-center">
                    <li className="text-base font-medium">
                      {accountById?.user_name}
                    </li>
                    <li className="text-sm">{accountById?.phone_number}</li>
                    <li className="text-sm">{orderDetail?.shipping_address}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
