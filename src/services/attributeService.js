import base from "./baseService";

const instanceAuth = base.service(true);
const instanceGuest = base.service(false);

export const getAllDistinctAttributes = () => {
  return instanceGuest.get("/attributes/distinct-names");
};

export const findAllByCategoryId = (id) => {
  return instanceGuest.get(`/attributes/byCategoryId/${id}`);
};

export default {
  getAllDistinctAttributes,
  findAllByCategoryId,
};
