import { http } from "./http";

export const apiLogin = (data) => {
  return http.post(`api/login`, data);
};

export const apiSignUp = (data) => {
  return http.post(`api/sign_up`, data);
};

export const apiRefreshToken = (data) => {
  return http.post(`api/refreshToken`, data);
};

// export const apiLoginByGoogle = () => {
//   return http.post(`http://localhost:8080/api/api/google`);
// };
