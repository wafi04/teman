export const BASE_URL = "http://localhost:8000/api";
export const TOKEN = localStorage.getItem("token");
export const COLOR = ["BLACK", "WHITE", "BLUE"] as const;

export enum STEPS {
  DETAILS = 1,
  IMAGE = 2,
  INVENTORY = 3,
}

export const BANK = [
  {
    nama: "BCA",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZAOwxm6jhfLmsWjVnnHl411KYZkB_V6iJQA&s",
  },
  {
    nama: "BRI",
    image:
      "https://i.pinimg.com/564x/d4/b9/f5/d4b9f5e496dafa4fe2138980446f3dd1.jpg",
  },
  {
    nama: "BNI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShne_g0DhrXLV1yNO6k48XQuzfkn6QNtQcOg&s",
  },
  {
    nama: "MANDIRI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhJKcBlDaDF2-Mk2cHWFSEF2JDZAboADJaBg&s",
  },
];
