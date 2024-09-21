import React, { useEffect, useState } from "react";
import AllOrder from "./AllOrder";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllOrder } from "../../../ReduxToolkit/sildes/OrderSlide";
import ConfirmOrder from "./ConfirmOrder";
import PendingOrder from "./PendingOrder";
import SuccessOrder from "./SuccessOrder";

const TabComponent = ({ reloadData, handleShowUpdate, handleShowDelete }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all order");
  const { allOrder } = useSelector((state) => state.orderReducer || {});

  const confirmOrder = allOrder.filter(
    (order) => order.delivery_status === "Confirm"
  );

  const pendingOrder = allOrder.filter(
    (order) => order?.delivery_status === "Pending"
  );

  const successOrder = allOrder.filter(
    (order) => order?.delivery_status === "Completed"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(axiosAllOrder());
  }, [dispatch, reloadData]);

  return (
    <div className="h-screen">
      <div className="relative">
        <ul className="relative flex flex-wrap p-1 bg-white">
          {["All order", "Confirm", "Pending", "Success"].map((tab) => (
            <li key={tab} className="flex-auto text-center">
              <button
                onClick={() => handleTabChange(tab.toLowerCase())}
                className={`z-30 flex items-center justify-center w-full px-0 py-1 transition-all ease-in-out cursor-pointer bg-inherit ${
                  activeTab === tab.toLowerCase()
                    ? "text-green-400 border-green-400 border-b-2"
                    : ""
                }`}
              >
                <span className="ml-1">{tab}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-2 transition-all duration-500">
          <div
            className={`${
              activeTab === "all order" ? "opacity-100" : "opacity-0 absolute"
            } transition-opacity duration-500`}
          >
            <AllOrder
              {...{ reloadData, handleShowUpdate, handleShowDelete, allOrder }}
            />
          </div>

          <div
            className={`${
              activeTab === "confirm" ? "opacity-100" : "opacity-0 absolute"
            } transition-opacity duration-500`}
          >
            <ConfirmOrder
              {...{
                handleShowUpdate,
                handleShowDelete,
                confirmOrder,
              }}
            />
          </div>
          <div
            className={`${
              activeTab === "pending" ? "opacity-100" : "opacity-0 absolute"
            } transition-opacity duration-500`}
          >
            <PendingOrder
              {...{
                handleShowUpdate,
                handleShowDelete,
                pendingOrder,
              }}
            />
          </div>
          <div
            className={`${
              activeTab === "success" ? "opacity-100" : "opacity-0 absolute"
            } transition-opacity duration-500`}
          >
            <SuccessOrder
              {...{
                handleShowUpdate,
                handleShowDelete,
                successOrder,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
