"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || 'redis://redis:6379',
        });
        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }
    async onModuleInit() {
        await this.client.connect();
        console.log('Connected to Redis');
    }
    async onModuleDestroy() {
        await this.client.disconnect();
    }
    async setDriverLocation(driverId, lon, lat) {
        await this.client.geoAdd('drivers_locations', {
            longitude: lon,
            latitude: lat,
            member: driverId,
        });
    }
    async getNearestDrivers(lon, lat, radiusKm) {
        return await this.client.geoSearch('drivers_locations', { longitude: lon, latitude: lat }, { radius: radiusKm, unit: 'km' });
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map