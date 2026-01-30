import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    className: string;
}