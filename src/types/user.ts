export interface UserData {
  id: number;
  name: string;
  image: string | null;
  email: string;
  role: "user" | "admin";
}
