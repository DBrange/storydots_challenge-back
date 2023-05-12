import { Column, Entity, OneToMany } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity {
  @Column()
  brand: string;

  @OneToMany(() => ProductEntity, (products) => products.brand)
  products: ProductEntity[];
}
