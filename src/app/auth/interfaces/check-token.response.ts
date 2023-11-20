import { Roles } from "./auth-roles.enum";
import { User } from "./user.interface";


export interface CheckTokenResponse {
  user: User;
  rol: Roles;
  token: string;
}
