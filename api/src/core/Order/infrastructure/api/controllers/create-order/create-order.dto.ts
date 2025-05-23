/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsString({ each: true })
  products: string[];

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;

  @IsOptional()
  status?: 'COMPLETED';
}
