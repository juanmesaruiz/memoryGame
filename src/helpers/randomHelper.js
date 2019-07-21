import { minNumberRandom } from "../config/constants";

export const getRandom = (max, min = minNumberRandom) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
