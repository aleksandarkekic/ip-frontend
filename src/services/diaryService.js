import base from "./baseService";

const instanceAuth = base.service(true);

export const getAllWeightedDiaries = () => {
  return instanceAuth.get("diaries/weightDiary");
};

export const getAllExercisedDiaries = () => {
  return instanceAuth.get("diaries/exerciseDiaries");
};

export const insertDiary = (request) => {
  return instanceAuth.post("/diaries", request);
};

export default {
  getAllWeightedDiaries,
  getAllExercisedDiaries,
  insertDiary,
};
