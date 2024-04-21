import base from "./baseService";

const instanceAuth = base.service(true);

export const getAllByProgramId = (programId) => {
  return instanceAuth.get(`/comments/programs/${programId}`);
};
export const getNumOfComments = (programId) => {
  return instanceAuth.get(`/comments/numOfElements/${programId}`);
};
export const addComment = (request, id) => {
  return instanceAuth.post(`/comments/programs/${id}`, request);
};
export default { getAllByProgramId, getNumOfComments, addComment };
