import React from "react";
import { FaSortAlphaDown } from "react-icons/fa";

const SortProducts = ({ handleSortChange, currentSort }) => {
  const getButtonClass = (sortOption) => {
    return sortOption === currentSort
      ? "bg-text_header text-sm text-white py-2 px-3 border-1 border-text_header rounded-md"
      : "text-sm text-text_header py-2 px-3 border-2 border-text_header rounded-md";
  };

  return (
    <section className="flex flex-col md:flex-row gap-3 flex-wrap items-center">
      <h3 className="flex items-center gap-1 text-lg md:text-base">
        <FaSortAlphaDown size={24} />
        Xếp theo:
      </h3>
      <ul className="flex flex-wrap gap-3">
        <li className="max-md:mb-3">
          <button
            onClick={() => handleSortChange("Tên A-Z")}
            className={getButtonClass("Tên A-Z")}
          >
            Tên A-Z
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSortChange("Tên Z-A")}
            className={getButtonClass("Tên Z-A")}
          >
            Tên Z-A
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSortChange("Hàng mới")}
            className={getButtonClass("Hàng mới")}
          >
            Hàng mới
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSortChange("Giá thấp đến cao")}
            className={getButtonClass("Giá thấp đến cao")}
          >
            Giá thấp đến cao
          </button>
        </li>
        <li>
          <button
            onClick={() => handleSortChange("Giá cao xuống thấp")}
            className={getButtonClass("Giá cao xuống thấp")}
          >
            Giá cao xuống thấp
          </button>
        </li>
      </ul>
    </section>
  );
};

export default SortProducts;
