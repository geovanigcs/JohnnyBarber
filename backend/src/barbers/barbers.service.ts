import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BarbersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.barber.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.barber.findUnique({
      where: { id },
      include: {
        barbershop: true,
        bookings: {
          include: {
            service: true,
            user: true,
          },
        },
      },
    });
  }

  async findByBarbershop(barbershopId: string) {
    return this.prisma.barber.findMany({
      where: { barbershopId },
      include: {
        barbershop: true,
      },
    });
  }
}
