export class CreateUserDto {
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  role?: string;
  bio?: string;
}
