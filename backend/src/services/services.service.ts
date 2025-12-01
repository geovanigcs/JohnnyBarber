import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        barbershop: true,
      },
    });
  }

  async findByBarbershop(barbershopId: string) {
    return this.prisma.service.findMany({
      where: { barbershopId },
      include: {
        barbershop: true,
      },
    });
  }
}
