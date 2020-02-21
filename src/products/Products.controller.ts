import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { ProductsService } from './Products.service';
import { ProductDTO } from './Product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  find(@Query() query: any, @Req() req: any) {
    console.log('Query', query);
    return this.productsService.find(query);
  }

  @Put()
  updateOne(@Body() updatedProduct: ProductDTO, @Req() req: any) {
    return this.productsService.findOneAndUpdate(
      updatedProduct._id,
      updatedProduct,
      req.user._id,
    );
  }

  @Delete(':id')
  deleteOneById(@Param() param: any, @Req() req: any) {
    return this.productsService.findByIdAndDelete(param.id);
  }
  @Get(':id')
  findOneById(@Param() Param: any, @Req() req: any) {
    console.log('Param', Param);
    return this.productsService.findOneById(Param.id);
  }
  @Get('view/:id')
  findOneView(@Param() Param: any, @Req() req: any) {
    console.log('Param', Param);
    return this.productsService.findOneView(Param.id);
  }

  @Post()
  create(@Body() createProductDto: ProductDTO, @Req() req: any) {
    // console.log('addProduct==>', createProductDto);
    return this.productsService.create(createProductDto, req.user._id);
  }
}
