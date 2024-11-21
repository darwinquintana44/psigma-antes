import {User} from './user.interface';

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
  expires_in: number;
  message: string;
}
