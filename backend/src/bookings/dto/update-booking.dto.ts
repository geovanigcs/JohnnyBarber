import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['CONFIRMED', 'CANCELLED', 'COMPLETED'])
  status?: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}
