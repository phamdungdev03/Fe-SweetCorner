import { http } from "./http";

export const apiAddToCart = (data) => {
  return http.post(`cart/addToCart`, data);
};

export const apiGetCartForUser = (id) => {
  return http.get(`cart/${id}`);
};

export const apiDeleteProductInCart = (id) => {
  return http.delete(`cart/${id}`);
};

export const apiDeleteCartForUser = (id) => {
  return http.delete(`/cart/all/${id}`);
};

export const apiUpdateQuantityProductInCart = (data) => {
  return http.put(`cart/update`, data);
};
