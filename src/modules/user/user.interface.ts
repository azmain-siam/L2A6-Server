export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "User" | "Admin";
}
