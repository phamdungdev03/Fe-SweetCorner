import TableAccounts from "./component/TableAccounts";
import HeaderAccounts from "./component/HeaderAccounts";
import DialogCreateAccount from "./component/DialogCreateAccount";
import { useEffect, useState } from "react";
import DialogUpdateAccount from "./component/DialogUpdateAccount";
import { useDispatch, useSelector } from "react-redux";
import { axiosAccounts } from "../../ReduxToolkit/sildes/AccountSlide";
import DialogDeleteAccount from "./component/DialogDeleteAccount";

const AccountsDashboard = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const { accounts, currentPage, pageSize, totalPages } = useSelector(
    (state) => state.accountReducer || {}
  );
  const dispatch = useDispatch();
  const handleShowCreate = () => {
    setOpenCreate(true);
  };

  const handleShowUpdate = (account) => {
    setOpenUpdate(true);
    setSelectedAccount(account);
  };

  const handleShowDelete = (account) => {
    setOpenDelete(true);
    setSelectedAccount(account);
  };

  const handleCloseDialog = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  const handleNextPage = () => {
    dispatch(
      axiosAccounts({
        currentPage: currentPage + 1,
        pageSize: pageSize,
        email: searchQuery,
      })
    );
  };

  const handlePrevPage = () => {
    dispatch(
      axiosAccounts({
        currentPage: currentPage - 1,
        pageSize: pageSize,
        email: searchQuery,
      })
    );
  };

  const handlePageClick = (page) => {
    dispatch(
      axiosAccounts({ currentPage: page, pageSize, email: searchQuery })
    );
  };

  const refreshData = () => {
    setReloadData(!reloadData);
  };

  const handleSreach = (query) => {
    setSearchQuery(query);
    dispatch(axiosAccounts({ currentPage: 1, pageSize, email: query }));
  };

  useEffect(() => {
    dispatch(axiosAccounts({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize, reloadData]);

  return (
    <>
      {/* {loading && <Loading />} */}

      <HeaderAccounts {...{ handleShowCreate, handleSreach }} />

      <TableAccounts
        {...{
          handleShowUpdate,
          handleShowDelete,
          accounts,
          currentPage,
          totalPages,
          handleNextPage,
          handlePrevPage,
          handlePageClick,
        }}
      />

      {openCreate && (
        <DialogCreateAccount {...{ handleCloseDialog, refreshData }} />
      )}

      {openUpdate && (
        <DialogUpdateAccount
          {...{ handleCloseDialog, selectedAccount, refreshData }}
        />
      )}

      {openDelete && (
        <DialogDeleteAccount
          {...{ handleCloseDialog, selectedAccount, refreshData }}
        />
      )}
    </>
  );
};

export default AccountsDashboard;
