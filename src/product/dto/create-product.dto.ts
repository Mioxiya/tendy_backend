import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  categoryId: string;

  @IsString()
  @IsOptional()
  basePrice?: number;

  @IsString()
  frontPrice: string;

  @IsObject()
  attributes: Record<string, string[]>;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  longImages: string[];

  @IsString()
  urlto: string;
}
