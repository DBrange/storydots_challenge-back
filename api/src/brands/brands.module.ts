import { Module } from '@nestjs/common';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { BrandEntity } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService],
  controllers: [BrandController]
})
export class BrandsModule {}
