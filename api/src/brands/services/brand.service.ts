import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';
import { BrandDTO } from '../dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async findAllBrands(): Promise<BrandEntity[]> {
    try {
      const brands: BrandEntity[] = await this.brandRepository.find();

      if (!brands.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No brand found',
        });
      }

      return brands;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async findBrandById(id: string): Promise<BrandEntity> {
    try {
      const brand: BrandEntity = await this.brandRepository
        .createQueryBuilder('brand')
        .where({ id })
        .leftJoinAndSelect('brand.products', 'products')
        .getOne()

        if (!brand) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No brand found',
        });
      }

      return brand;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async createBrand(body: BrandDTO): Promise<BrandEntity> {
    try {
      const brand: BrandEntity = await this.brandRepository.save(body);

      return brand;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async updateBrand(
    id: string,
    body: BrandDTO,
  ): Promise<UpdateResult> {
    try {
      const product: UpdateResult = await this.brandRepository.update(
        id,
        body,
      );

      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update brand',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async deleteBrand(
    id: string,
  ): Promise<DeleteResult> {
    try {
      const product: DeleteResult = await this.brandRepository.delete(id);

      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete brand',
        });
      }

      return product;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }
}
