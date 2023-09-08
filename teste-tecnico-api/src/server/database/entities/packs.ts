import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product';

@Entity('packs')
export class Packs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

  @Column({ type: 'bigint', nullable: false })
    pack_id: number;

  @Column({ type: 'bigint', nullable: false })
    product_id: number;

  @Column({ type: 'bigint', nullable: false })
    qty: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pack_id', referencedColumnName: 'code' })
    pack: Product;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'code' })
    product: Product;
}
