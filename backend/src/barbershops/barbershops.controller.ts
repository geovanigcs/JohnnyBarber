import { Controller, Get, Param } from '@nestjs/common';
import { BarbershopsService } from './barbershops.service';

@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopsService: BarbershopsService) {}

  @Get()
  findAll() {
    return this.barbershopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbershopsService.findOne(id);
  }
}
