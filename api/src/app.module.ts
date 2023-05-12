import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UserModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UserModule,
    ProductsModule,
    BrandsModule,
    AuthModule,
  ]
})
export class AppModule {}
