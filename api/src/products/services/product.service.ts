import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';
import { ProductDTO } from '../dto/product.dto';
import { ProductUpdateDTO } from '../dto/productUpdate.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    try {
      const products: ProductEntity[] = await this.productRepository.createQueryBuilder('product').leftJoinAndSelect('product.brand', 'brand').getMany()

      if (!products.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No product found',
        });
      }

      return products;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async findProductById(id: string): Promise<ProductEntity> {
    try {
      const product: ProductEntity = await this.productRepository
        .createQueryBuilder('product')
        .where({ id })
        .leftJoinAndSelect('product.brand', 'brand')
        .getOne();

      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No product found',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async findProductByName(name: string): Promise<ProductEntity[]> {
    try {
      const product: ProductEntity[] = await this.productRepository
        .createQueryBuilder('product')
        .where('product.name LIKE :name', { name: `${name}%` })
        .take(10)
        .getMany()

      if (!product.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No product found',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async createProduct(body: ProductDTO): Promise<ProductEntity> {
    try {
      const product: ProductEntity = await this.productRepository.save(body);

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async updateProduct(
    id: string,
    body: ProductUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      const product: UpdateResult = await this.productRepository.update(id, body);

      if (!product.affected) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update product',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async deleteProduct(
    id: string,
  ): Promise<DeleteResult> {
    try {
      const product: DeleteResult = await this.productRepository.delete(id);

      if (!product.affected) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete product',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }
}
