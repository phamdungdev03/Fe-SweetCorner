import { http } from "./http";

export const apiGetProducts = (
  page,
  limit,
  name = "",
  minPrice = 0,
  maxPrice = Infinity,
  category = "",
  sortOption = "Tên A-Z"
) => {
  return http.get(`product/`, {
    params: {
      page: page,
      limit: limit,
      name: name,
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: category,
      sort: sortOption,
    },
  });
};

// export const apiGetProducts = (
//   page,
//   limit,
//   name = "",
//   sortOption = "Tên A-Z"
// ) => {
//   return http.get(
//     `product/?page=${page}&limit=${limit}&name=${name}&sort=${sortOption}`
//   );
// };

export const apiGetProductById = (id) => {
  return http.get(`/product/${id}`);
};

export const apiCreateProduct = (data) => {
  return http.post(`product/create_product`, data);
};

export const apiUpdateProduct = (id, data) => {
  return http.put(`product/update_product/${id}`, data);
};

export const apiDeleteProduct = (id) => {
  return http.delete(`product/delete_product/${id}`);
};
