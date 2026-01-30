import { IsEnum, IsOptional, IsString } from 'class-validator'
import { UserRole } from '@prisma/client'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole

  @IsOptional()
  memberId?: number
}
