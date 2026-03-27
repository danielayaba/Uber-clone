import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from './driver.entity';

@Entity('driver_locations')
export class DriverLocation {
  @PrimaryColumn('uuid', { name: 'driver_id' })
  driverId: string;

  @OneToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  heading: number;

  @Column({ type: 'double precision', nullable: true })
  speed: number;

  @Column({ type: 'double precision', nullable: true })
  accuracy: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
