import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    author: string;
    @IsInt()
    @IsNotEmpty()
    stock: number;
    @IsInt()
    @Min(1)
    year: number;
}

// export class CreateBookDto {
//   title: string;
//   author: string;
//   year: number;
// } 