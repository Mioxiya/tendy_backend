import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ImageSizeDto {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

export class ControlNetDto {
  @IsString()
  controlType: string;

  @IsString()
  controlImage: string;
}

export class Text2ImgDto {
  @IsObject()
  @ValidateNested()
  @Type(() => ImageSizeDto)
  imageSize: ImageSizeDto;

  @IsString()
  prompt: string;

  @IsOptional()
  @IsString()
  aspectRatio: string;

  @IsOptional()
  @IsNumber()
  imgCount: number;

  @IsNumber()
  steps: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ControlNetDto)
  controlnet?: ControlNetDto;
}

export class GenerateStatusDto {
  @IsString()
  generateUuid: string;
}
