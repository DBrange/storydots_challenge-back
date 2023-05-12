import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../dto/product.dto';
import { ProductUpdateDTO } from '../dto/productUpdate.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PublicAccess()
  @Get('all')
  async getProducts() {
    return this.productService.findAllProducts();
  }

  @PublicAccess()
  @Get(':productId')
  async getProductById(@Param('productId') id: string) {
    return this.productService.findProductById(id);
  }

  @PublicAccess()
  @Get()
  async getProductByName(@Query('name') name: string) {
    return this.productService.findProductByName(name);
  }

  @Post('create-product')
  async createProduct(@Body() body: ProductDTO) {
    return this.productService.createProduct(body);
  }

  @Put('edit/:productId')
  async updateProduct(
    @Param('productId') id: string,
    @Body() body: ProductUpdateDTO,
  ) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('delete/:productId')
  async deleteProduct(@Param('productId') id: string) {
    return this.productService.deleteProduct(id);
  }
}
