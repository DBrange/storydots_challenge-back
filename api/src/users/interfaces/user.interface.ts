import { ROLES } from '../../constants/roles';

export interface IUserEntity {
  username: string;
  email: string;
  password: string;
  role: ROLES;
}

export interface IFindBy{
  key: keyof IUserEntity;
  value: any
}
