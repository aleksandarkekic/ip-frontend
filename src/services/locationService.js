import base from "./baseService";

const instanceAuth = base.service(true);
const instanceGuest = base.service(false);

export const getAllDistinctLocations = () => {
  return instanceGuest.get("/locations/distinct-names");
};

export default {
  getAllDistinctLocations,
};
