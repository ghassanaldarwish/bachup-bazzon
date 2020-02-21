import { IsBoolean } from 'class-validator';

export class PageDTO {
  @IsBoolean()
  pending: boolean;
}
