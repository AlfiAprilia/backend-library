import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  // ======================
  // PINJAM BUKU
  // ======================
  async borrowBook(dto: CreateLoanDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Stok buku habis');
    }

    // Kurangi stok + buat loan (TRANSAKSI)
    return this.prisma.$transaction(async (tx) => {
      await tx.book.update({
        where: { id: dto.bookId },
        data: { stock: { decrement: 1 } },
      });

      return tx.loan.create({
        data: {
          bookId: dto.bookId,
          memberId: dto.memberId,
          borrower: 'MEMBER',
          status: 'BORROWED',
        },
        include: {
          book: true,
          member: true,
        },
      });
    });
  }

  // ======================
  // KEMBALIKAN BUKU
  // ======================
  async returnBook(loanId: number) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
      include: { book: true },
    });

    if (!loan) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    if (loan.status === 'RETURNED') {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    return this.prisma.$transaction(async (tx) => {
      // Update loan
      const updatedLoan = await tx.loan.update({
        where: { id: loanId },
        data: {
          status: 'RETURNED',
          returnDate: new Date(),
        },
      });

      // Tambah stok buku
      await tx.book.update({
        where: { id: loan.bookId },
        data: {
          stock: { increment: 1 },
        },
      });

      return updatedLoan;
    });
  }
}
