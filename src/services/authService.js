import base from "./baseService";

const instanceAuth = base.service(true);
const instanceGuest = base.service(false);
const stringAdmin = "12-4a5ba8q-kkl9135d-dfhdc119-f33184";
const stringUser = "1y56t9z7-8s513sa6-7s03kl2-99p4";

export const register = (request) => {
  return instanceGuest.post("/api/auth/register", request);
};

export const logIn = (request) => {
  return instanceGuest.post("/api/auth/login", request);
};

export const currentRole = () => {
  return instanceAuth.get("users/current-role");
};
export const getCurrentId = () => {
  return instanceAuth.get("users/current-id");
};
export const sendPin = (username) => {
  return instanceGuest.get(`/api/auth/send-pin/${username}`);
};

export const isConfirmed = (username) => {
  return instanceGuest.get(`users/email-confirmed/${username}`);
};
export const setRole = (role) => {
  if (role === "USER") return stringUser;
  if (role === "ADMIN") return stringAdmin;
};
export const CheckIfAdmin = () => {
  const role = localStorage.getItem("role");
  if (role !== null || typeof role === "undefined") {
    if (role === stringAdmin) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const CheckIfUser = () => {
  const role = localStorage.getItem("role");
  if (role !== null || typeof role === "undefined") {
    if (role === stringUser) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const CheckIfAuthorized = () => {
  return CheckIfAdmin() || CheckIfUser();
};

export default {
  register,
  logIn,
  currentRole,
  isConfirmed,
  sendPin,
  setRole,
  CheckIfAdmin,
  CheckIfUser,
  CheckIfAuthorized,
  getCurrentId,
};
