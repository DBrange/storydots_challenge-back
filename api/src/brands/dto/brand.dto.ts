import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDTO {
  @IsNotEmpty()
  @IsString()
  brand: string;
}
