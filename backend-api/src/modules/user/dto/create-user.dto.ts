export class CreateUserDto {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    avatar?: string;
    address?: string;
    role: string
}