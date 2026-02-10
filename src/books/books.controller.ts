import {
Body, Controller, Delete, Get, Param,
ParseIntPipe, Post, Put, UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    // @Post()
    @Post('tambah')
    @ApiOperation({ summary: 'Menambahkan buku (ADMIN only)' })
    create(@Body() body: any) {
        return body;
}
constructor(private readonly booksService:
BooksService) {}
    @Get()
    @ApiOperation({ summary: 'Menampilkan seluruh data buku' })
    findAll() {
        return [];
}
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.findOne(id);
}
    @Put('ganti/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body()
    dto: UpdateBookDto) {
        return this.booksService.update(id, dto);
}
    @Delete('hapus/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.remove(id);
}
}