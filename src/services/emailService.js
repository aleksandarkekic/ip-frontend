import base from "./baseService";
const instanceGuest = base.service(false);

export const confirmEmail = (request) => {
  return instanceGuest.post("/api/auth/confirm-pin", request);
};

export default {
  confirmEmail,
};
