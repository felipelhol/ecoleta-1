import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import PointItem from './PointItems';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.point, { cascade: ['update'] })
  user: User;

  @Column()
  name: string;

  @Column()
  image: string;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    return encodeURI(`${process.env.APP_API_URL}/uploads/${this.image}`);
  }

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  uf: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => PointItem, pointItem => pointItem.point, {
    cascade: true,
  })
  point_items: PointItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Point;
