import base from "./baseService";

const instanceAuth = base.service(true);
const instance = base.service(false);
export const findAll = () => {
  return instance.get("/programs");
};
export const getProgramInfo = (id) => {
  return instance.get(`/programs/${id}`);
};

export const findAllPaginated = (page, size) => {
  return instance.get(`/programs/paginated?page=${page}&size=${size}`);
};
export const findByIdsPaginated = (page, size, programIds) => {
  return instance.get(
    `/programs/paginatedByIds?page=${page}&size=${size}&programIds=${programIds}`
  );
};
export const getFiltered = (
  page,
  size,
  priceFrom,
  priceTo,
  categoryName,
  locationName,
  attributeName,
  search
) => {
  let queryString = `/programs/filtered?page=${page}&size=${size}`;

  if (priceFrom) {
    queryString += `&priceFrom=${priceFrom}`;
  }
  if (priceTo) {
    queryString += `&priceTo=${priceTo}`;
  }
  if (categoryName) {
    queryString += `&categoryName=${categoryName}`;
  }
  if (locationName) {
    queryString += `&locationName=${locationName}`;
  }
  if (attributeName) {
    queryString += `&attributeName=${attributeName}`;
  }
  if (search) {
    queryString += `&search=${search}`;
  }
  return instance.get(queryString);
};

export const addProgram = (request) => {
  return instanceAuth.post(`/programs`, request);
};

export const getMaxId = () => {
  return instanceAuth.get("/programs/max");
};

export const deleteProgram = (id) => {
  return instanceAuth.delete(`/programs/${id}`);
};

export const getAllByUserId = (id, page, size) => {
  return instanceAuth.get(`/programs/user/${id}?page=${page}&size=${size}`);
};

export const activateProgram = (id) => {
  return instanceAuth.put(`/programs/activate/${id}`);
};
export const deactivateProgram = (id) => {
  return instanceAuth.put(`/programs/deactivate/${id}`);
};
export default {
  findAll,
  findAllPaginated,
  getProgramInfo,
  getFiltered,
  addProgram,
  getMaxId,
  deleteProgram,
  getAllByUserId,
  findByIdsPaginated,
  activateProgram,
  deactivateProgram,
};
