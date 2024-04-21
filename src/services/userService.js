import base from "./baseService";

const instanceAuth = base.service(true);

export const getCurrentUserId = () => {
  return instanceAuth.get("/users/current-id");
};

export const findAllUsers = () => {
  return instanceAuth.get("/users");
};
export const findAllUsersWithRoleUser = () => {
  return instanceAuth.get("/users/user");
};
export const getCurrentUserInfo = () => {
  return instanceAuth.get("/users/current-user-info");
};

export const findUsernameById = (id) => {
  return instanceAuth.get(`/users/username/${id}`);
};

export const editUser = (id, request) => {
  return instanceAuth.put(`/users/${id}`, request);
};

export const subscribeToCategory = (id, categoryName) => {
  return instanceAuth.put(
    `/users/categorySub/${id}?categoryName=${categoryName}`
  );
};

export const findAllUsersWithRoleAdvisor = () => {
  return instanceAuth.get("/users/advisor");
};

export default {
  getCurrentUserId,
  findAllUsers,
  getCurrentUserInfo,
  findUsernameById,
  editUser,
  subscribeToCategory,
  findAllUsersWithRoleUser,
  findAllUsersWithRoleAdvisor,
};
