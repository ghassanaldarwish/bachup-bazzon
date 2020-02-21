import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsArray,
  IsUrl,
  IsString,
  IsEmail,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  provider: string;

  @MaxLength(1000)
  @IsString()
  @IsUrl()
  icon: string;

  @MaxLength(1000)
  @IsString()
  @IsUrl()
  image: string;

  @MaxLength(255)
  @IsString()
  locale: string;

  @MaxLength(10, { message: 'price  must be max 10 characters' })
  @IsNotEmpty()
  price: string;

  @MaxLength(1000)
  @IsNotEmpty()
  emailVerified: any;

  @MaxLength(255)
  @IsString()
  thirdPartyId: string;

  @MinLength(10)
  @MaxLength(1000)
  @IsString()
  bio: string;

  @MaxLength(50)
  @IsNotEmpty()
  subCategorie: string;

  @MaxLength(50)
  @IsString()
  titel: string;

  @MinLength(2)
  @MaxLength(1000)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsDate()
  date: any;

  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  superAdmin: boolean;

  @IsDate()
  lastVisit: any;

  idAddress: any;

  @IsNumber()
  @MaxLength(255)
  deleteArticles: number;

  updateArticles: any;

  createArticles: any;
}
