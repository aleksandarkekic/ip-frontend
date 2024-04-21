import base from "./baseService";

const instanceAuth = base.service(true);
const instance = base.service(false);

export const getFirstPhotoByProgramId = (id) => {
  return instance.get(`photos/program/${id}/first-photo`);
};
export const getPhotosByProgramId = (id) => {
  return instance.get(`photos/program/${id}`);
};
export default {
  getFirstPhotoByProgramId,
  getPhotosByProgramId,
};
