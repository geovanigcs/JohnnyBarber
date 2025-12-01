import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BarbershopsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.barbershop.findMany({
      include: {
        services: true,
        barbers: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.barbershop.findUnique({
      where: { id },
      include: {
        services: true,
        barbers: true,
      },
    });
  }
}
