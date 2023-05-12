import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../../constants/roles';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
