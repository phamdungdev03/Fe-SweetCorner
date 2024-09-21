import { useState } from "react";
import HeaderOrder from "./component/HeaderOrder";
import TabComponent from "./component/TabOrder";
import DialogCreateOrder from "./component/DialogCreateOrder";
import DialogUpdateOrder from "./component/DialogUpdateOrder";
import DialogDeleteOrder from "./component/DialogDeleteOrder";

const OrderDashboard = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const handleShowCreate = () => {
    setOpenCreate(true);
  };

  const handleShowUpdate = (id) => {
    setOpenUpdate(true);
    setSelectedOrder(id);
  };

  const handleShowDelete = (id) => {
    setOpenDelete(true);
    setSelectedOrder(id);
  };

  const handleCloseDialog = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  const handleReloadData = () => {
    setReloadData(!reloadData);
  };

  return (
    <>
      <HeaderOrder {...{ handleShowCreate }} />

      <TabComponent {...{ reloadData, handleShowUpdate, handleShowDelete }} />

      {openCreate && (
        <DialogCreateOrder {...{ handleCloseDialog, handleReloadData }} />
      )}

      {openUpdate && (
        <DialogUpdateOrder
          {...{ handleCloseDialog, handleReloadData, selectedOrder }}
        />
      )}

      {openDelete && (
        <DialogDeleteOrder
          {...{ handleCloseDialog, handleReloadData, selectedOrder }}
        />
      )}
    </>
  );
};
export default OrderDashboard;
