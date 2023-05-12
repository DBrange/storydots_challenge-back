import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
