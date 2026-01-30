import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  // PINJAM BUKU
  @Post('borrow')
  borrowBook(@Body() dto: CreateLoanDto) {
    return this.loanService.borrowBook(dto);
  }

  // KEMBALIKAN BUKU
  @Patch('return/:id')
  returnBook(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.returnBook(id);
  }
}
