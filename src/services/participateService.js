import base from "./baseService";

const instanceAuth = base.service(true);

export const insertParticipate = (programId) => {
  return instanceAuth.post(`/participate`, programId);
};

export const findByUserId = (userId) => {
  return instanceAuth.get(`participate/${userId}`);
};
export default {
  insertParticipate,
  findByUserId,
};
