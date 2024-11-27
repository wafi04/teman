export const BASE_URL = "http://localhost:8000/api";
export const TOKEN = localStorage.getItem("token");
export const COLOR = ["BLACK", "WHITE", "BLUE"] as const;

export enum STEPS {
  DETAILS = 1,
  IMAGE = 2,
  INVENTORY = 3,
}
