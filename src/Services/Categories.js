import { http } from "./http";

export const apiGetCategories = (name = "") => {
  return http.get(`category/?name=${name}`);
};

export const apiCreateCategory = (data) => {
  return http.post(`category/create_category`, data);
};

export const apiUpdateCategory = (id, data) => {
  return http.put(`category/update_category/ ${id}`, data);
};

export const apiDeleteCategory = (id) => {
  return http.delete(`category/delete_category/${id}`);
};
