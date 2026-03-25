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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
let LocationService = class LocationService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async updateDriverLocation(driverId, lat, lng) {
        await this.redisService.setDriverLocation(driverId, lng, lat);
    }
    async findNearestDrivers(lat, lng, radius = 5) {
        const nearbyDrivers = await this.redisService.getNearestDrivers(lng, lat, radius);
        return nearbyDrivers;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], LocationService);
//# sourceMappingURL=location.service.js.map