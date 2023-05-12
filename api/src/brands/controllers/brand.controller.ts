import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { BrandDTO } from '../dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('all')
  async getBrands() {
    return await this.brandService.findAllBrands();
  }

  @Get(':brandId')
  async getBrandById(@Param('brandId') id: string) {
    return await this.brandService.findBrandById(id);
  }

  @Post('create-brand')
  async createBrand(@Body() body: BrandDTO) {
    return await this.brandService.createBrand(body);
  }

  @Put('edit/:brandId')
  async updateBrand(@Param('brandId') id: string, @Body() body: BrandDTO) {
    return await this.brandService.updateBrand(id, body);
  }

  @Delete('delete/:brandId')
  async deleteBrand(@Param('brandId') id: string) {
    return await this.brandService.deleteBrand(id);
  }
}
