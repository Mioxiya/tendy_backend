import { IsString } from 'class-validator';

export class DeleteProductResponseDto {
  @IsString()
  id: string;
}
