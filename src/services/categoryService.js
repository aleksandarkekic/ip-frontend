import base from "./baseService";

const instanceAuth = base.service(true);
const instanceGuest = base.service(false);

export const getAllDistinctCategories = () => {
  return instanceGuest.get("/categories/distinct-names");
};
export const findIdByName = (name) => {
  return instanceGuest.get(`/categories/${name}`);
};
export default {
  getAllDistinctCategories,
  findIdByName,
};
