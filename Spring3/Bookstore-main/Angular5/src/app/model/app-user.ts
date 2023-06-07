import {UserRole} from './user-role';

export interface AppUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  creationDate?: string;
  isDeleted?: boolean;
  userRoles?: UserRole;
}
