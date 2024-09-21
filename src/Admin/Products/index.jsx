import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosProducts } from "../../ReduxToolkit/sildes/ProductSlide";
import TableProducts from "./component/TableProducts";
import HeaderProducts from "./component/HeaderProducts";
import DialogCreateProduct from "./component/DialogCreateProduct";
import DialogUpdateProduct from "./component/DialogUpdateProduct";
import DialogDeleteProduct from "./component/DialogDeleteProduct";

const ProductsDashboard = () => {
  const dispatch = useDispatch();
  const { products, currentPage, pageSize, totalPages } = useSelector(
    (state) => state?.productReducer || {}
  );

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowCreate = () => {
    setOpenCreate(true);
  };

  const handleShowUpdate = (id) => {
    setOpenUpdate(true);
    setSelectedProduct(id);
  };

  const handleShowDelete = (id) => {
    setOpenDelete(true);
    setSelectedProduct(id);
  };

  const handleCloseDialog = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  const handleNextPage = () => {
    dispatch(
      axiosProducts({
        currentPage: currentPage + 1,
        pageSize: pageSize,
        name: searchQuery,
      })
    );
  };

  const handlePrevPage = () => {
    dispatch(
      axiosProducts({
        currentPage: currentPage - 1,
        pageSize: pageSize,
        name: searchQuery,
      })
    );
  };

  const handlePageClick = (page) => {
    dispatch(axiosProducts({ currentPage: page, pageSize, name: searchQuery }));
  };

  const handleSreach = (query) => {
    setSearchQuery(query);
    dispatch(axiosProducts({ currentPage: 1, pageSize, name: query }));
  };

  const refreshData = () => {
    setReloadData(!reloadData);
  };

  useEffect(() => {
    dispatch(axiosProducts({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize, reloadData]);

  return (
    <>
      {/* {loading && <Loading />} */}

      <HeaderProducts {...{ handleShowCreate, handleSreach }} />
      <TableProducts
        {...{
          products,
          handleShowUpdate,
          handleShowDelete,
          handleNextPage,
          handlePrevPage,
          handlePageClick,
          totalPages,
          currentPage,
        }}
      />

      {openCreate && (
        <DialogCreateProduct {...{ handleCloseDialog, refreshData }} />
      )}
      {openUpdate && (
        <DialogUpdateProduct
          {...{ handleCloseDialog, selectedProduct, refreshData }}
        />
      )}
      {openDelete && (
        <DialogDeleteProduct
          {...{ handleCloseDialog, selectedProduct, refreshData }}
        />
      )}
    </>
  );
};

export default ProductsDashboard;
