import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole, {
    message: 'Valid role required',
  })
  role: UserRole;
}
