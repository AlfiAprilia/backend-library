import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoanModule } from './loan/loan.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ PrismaModule, BooksModule, MembersModule, LoanModule, AuthModule, UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
      process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
