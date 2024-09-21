import { useState } from "react";

const ListFilterCollections = ({ handleFilterChange }) => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const priceRanges = [
    { label: "Dưới 10.000đ", min: 0, max: 10000 },
    { label: "Từ 10.000đ - 50.000đ", min: 10000, max: 50000 },
    { label: "Từ 50.000đ - 100.000đ", min: 50000, max: 100000 },
    { label: "Từ 100.000đ - 200.000đ", min: 100000, max: 200000 },
    { label: "Từ 200.000đ - 300.000đ", min: 200000, max: 300000 },
    { label: "Từ 300.000đ - 500.000đ", min: 300000, max: 500000 },
    { label: "Từ 500.000đ - 1 triệu", min: 500000, max: 1000000 },
    { label: "Trên 1 triệu", min: 1000000, max: Infinity },
  ];

  const handlePriceRangeChange = (range) => {
    const { min, max } = range;
    setSelectedPriceRanges((prev) =>
      prev.find((item) => item.min === min && item.max === max)
        ? prev.filter((item) => item.min !== min || item.max !== max)
        : [...prev, range]
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    // Lấy minPrice nhỏ nhất và maxPrice lớn nhất từ các khoảng giá được chọn
    const selectedMinPrice =
      selectedPriceRanges.length > 0
        ? Math.min(...selectedPriceRanges.map((range) => range.min))
        : 0;

    const selectedMaxPrice =
      selectedPriceRanges.length > 0
        ? Math.max(...selectedPriceRanges.map((range) => range.max))
        : Infinity;

    // Truyền giá trị minPrice và maxPrice cho hàm handleFilterChange
    handleFilterChange({
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
      categories: selectedCategories,
    });
  };
  return (
    <>
      <div className="text-xl font-serif font-semibold py-2 px-3 text-white mb-5 border-2 border-text_header rounded-md bg-text_header">
        Bộ lọc sản phẩm
        <span className="text-sm font-normal block font-quicksand">
          Giúp bạn tìm sản phẩm nhanh hơn
        </span>
      </div>

      <aside className="mb-5 border-2 border-text_header rounded-md font-quicksand">
        <h2 className="text-lg bg-text_header py2 px-3 font-semibold text-white">
          Chọn mức giá
        </h2>
        <div className="w-full relative max-h-52 overflow-y-scroll p-3">
          <ul>
            {priceRanges.map((range, index) => (
              <li key={index}>
                <span className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.some(
                      (item) => item.min === range.min && item.max === range.max
                    )}
                    onChange={() => handlePriceRangeChange(range)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">{range.label}</label>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <aside className="mb-5 border-2 border-text_header rounded-md font-quicksand">
        <h2 className="text-lg bg-text_header py2 px-3 font-semibold text-white">
          Loại
        </h2>
        <div className="w-full relative max-h-52 overflow-y-scroll p-3">
          <ul>
            {[
              "Bánh kem",
              "Bánh khô",
              "Bánh mì",
              "Bánh miếng",
              "Bánh mousse",
              "Bánh ngọt",
              "Bánh tráng miệng",
            ].map((category, index) => (
              <li key={index}>
                <span className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">{category}</label>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <button
        onClick={applyFilters}
        className="bg-text_header text-white py-2 px-4 rounded-md"
      >
        Áp dụng bộ lọc
      </button>
    </>
  );
};

export default ListFilterCollections;
