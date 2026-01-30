import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    return this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
        role: dto.role,
        memberId: dto.memberId,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        member: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { member: true },
    })
  }

  async update(id: number, dto: UpdateUserDto) {
    let data: any = { ...dto }

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10)
    }

    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
