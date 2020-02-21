import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsArray,
  IsUrl,
  IsBoolean,
  IsString,
} from 'class-validator';

export class ProductDTO {
  _id: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @MaxLength(100)
  @IsNotEmpty()
  categorie: string;

  // @MinLength(20)
  @MaxLength(300)
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @MinLength(5)
  @MaxLength(600)
  @IsNotEmpty()
  image: string;

  // @IsUrl()
  @MinLength(5)
  @MaxLength(600)
  @IsNotEmpty()
  link: string;

  @MaxLength(10, { message: 'price  must be max 10 characters' })
  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  productMedia: any;

  @IsArray()
  @IsNotEmpty()
  productReview: [];

  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  productSource: string;

  @MaxLength(50)
  @IsNotEmpty()
  subCategorie: string;

  @MaxLength(50)
  @IsNotEmpty()
  subSubCategorie: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  subTitle: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  topProduct: boolean;

  @IsBoolean()
  pending: boolean;
}
