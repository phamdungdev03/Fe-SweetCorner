import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCategories from "./component/TableCategories";
import HeaderCategories from "./component/HeaderCategories";
import { axiosCatrgories } from "../../ReduxToolkit/sildes/CategoriesSlide";
import DialogCreateCategory from "./component/DialogCreateCategory";
import DialogUpdateCategory from "./component/DialogUpdateCategory";
import DialogDeleteCategory from "./component/DIalogDeleteCategory";

const CategoriesDashboard = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer || {});
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [selectedCategory, setSeletedCategory] = useState();

  const handleShowCreate = () => {
    setOpenCreate(true);
  };

  const handleShowUpdate = (category) => {
    setOpenUpdate(true);
    setSeletedCategory(category);
  };

  const handleShowDelete = (category) => {
    setOpenDelete(true);
    setSeletedCategory(category);
  };

  const handleCloseDialog = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  const handleReloadData = () => {
    setReloadData(!reloadData);
  };

  const handleSreach = (query) => {
    dispatch(axiosCatrgories({ name: query }));
  };

  useEffect(() => {
    dispatch(axiosCatrgories({ name: "" }));
  }, [dispatch, reloadData]);

  return (
    <>
      {/* {loading && <Loading />} */}
      <HeaderCategories {...{ handleShowCreate, handleSreach }} />

      <TableCategories
        {...{ categories, handleShowUpdate, handleShowDelete }}
      />

      {openCreate && (
        <DialogCreateCategory {...{ handleCloseDialog, handleReloadData }} />
      )}
      {openUpdate && (
        <DialogUpdateCategory
          {...{ handleCloseDialog, handleReloadData, selectedCategory }}
        />
      )}
      {openDelete && (
        <DialogDeleteCategory
          {...{ handleCloseDialog, handleReloadData, selectedCategory }}
        />
      )}
    </>
  );
};

export default CategoriesDashboard;
