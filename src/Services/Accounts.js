import { http } from "./http";

export const apiGetAccounts = (page, limit, email = "") => {
  return http.get(`account/?page=${page}&limit=${limit}&email=${email}`);
};

export const apiGetAccountById = (id) => {
  return http.get(`account/account_id/${id}`);
};

export const apiGetAccountLogin = () => {
  return http.get(`account/info_Login`);
};

export const apiCreateAccount = (data) => {
  return http.post(`account/create_account`, data);
};

export const apiUpdateAccount = (id, data) => {
  return http.put(`account/update_account/${id}`, data);
};

export const apiDeleteAccount = (id) => {
  return http.delete(`account/delete_account/${id}`);
};

export const apiForgotPassword = (data) => {
  return http.post(`account/forgot_password`, data);
};

export const apiVerifyOtp = (data) => {
  return http.post(`account/verify_otp`, data);
};

export const apiResetPassword = (data) => {
  return http.post(`account/reset-password`, data);
};
