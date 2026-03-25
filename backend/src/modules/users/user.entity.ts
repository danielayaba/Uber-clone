import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { SavedPlace } from './saved-place.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 120, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 20, default: 'rider' })
  role: string;

  @Column({ type: 'text', name: 'profile_photo', nullable: true })
  profilePhoto: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => SavedPlace, (savedPlace) => savedPlace.user)
  savedPlaces: SavedPlace[];
}
