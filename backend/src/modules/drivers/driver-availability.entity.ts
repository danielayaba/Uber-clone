import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from './driver.entity';

@Entity('driver_availability')
export class DriverAvailability {
  @PrimaryColumn('uuid', { name: 'driver_id' })
  driverId: string;

  @OneToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'is_available', default: false })
  isAvailable: boolean;

  @UpdateDateColumn({ name: 'last_updated' })
  lastUpdated: Date;
}
