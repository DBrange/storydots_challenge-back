import { BaseEntity } from '../../config/base.entity';
import { IProductEntity } from '../interfaces/products.interface';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BrandEntity } from '../../brands/entities/brand.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity implements IProductEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({
    name: 'product_brand',
  })
  brand: BrandEntity;
}
