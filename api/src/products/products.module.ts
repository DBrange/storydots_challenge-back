import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/users/service/user.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  providers: [ProductService, UserService],
  controllers: [ProductController]
})
export class ProductsModule {}
