import { http } from "./http";

export const apiGetAllOrder = () => {
  return http.get(`order`);
};

export const apiGetOrderById = (id) => {
  return http.get(`order/orders/${id}`);
};

export const apiCreateOrder = (data) => {
  return http.post(`order/create_order`, data);
};

export const apiUpdateOrder = (id, data) => {
  return http.put(`order/update_order/${id}`, data);
};

export const apiDeleteOrder = (id) => {
  return http.delete(`order/delete_order/${id}`);
};

export const apiPayment = (data) => {
  return http.post(`order/payment`, data);
};

export const apiOrderStatus = (id) => {
  return http.post(`order/order_status/${id}`);
};
