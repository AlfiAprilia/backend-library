import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SIX SEVEN!!';
  }

  getWelcome(): string {
    return 'Welcome to Library API';
  }

  tambah(a: number, b: number): number{
    return a*b;
}

}
