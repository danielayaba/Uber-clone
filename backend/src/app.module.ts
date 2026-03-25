import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { TripsModule } from './modules/trips/trips.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SocketGateway } from './gateways/socket.gateway';
import { LocationService } from './services/location.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    AuthModule,
    UsersModule,
    DriversModule,
    TripsModule,
    PaymentsModule,
    RatingsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [SocketGateway, LocationService, RedisService],
})
export class AppModule {}
