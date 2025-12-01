import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookingDto & { userId: string }) {
    // Verificar se o horário está disponível
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        barberId: data.barberId,
        date: new Date(data.date),
        status: { not: 'CANCELLED' },
      },
    });

    if (existingBooking) {
      throw new BadRequestException('Este horário já está reservado');
    }

    return this.prisma.booking.create({
      data: {
        userId: data.userId,
        serviceId: data.serviceId,
        barberId: data.barberId,
        date: new Date(data.date),
        notes: data.notes,
        status: 'CONFIRMED',
      },
      include: {
        service: true,
        barber: {
          include: {
            barbershop: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        barber: {
          include: {
            barbershop: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        barber: {
          include: {
            barbershop: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return booking;
  }

  async update(id: string, data: UpdateBookingDto) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: { id },
      data,
      include: {
        service: true,
        barber: {
          include: {
            barbershop: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
