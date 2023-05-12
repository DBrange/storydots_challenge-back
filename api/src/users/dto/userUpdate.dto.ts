import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLES } from '../../constants/roles';

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
