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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("../../services/location.service");
let TripsService = class TripsService {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async requestRide(riderId, pickupLat, pickupLng, dropLat, dropLng) {
        const nearbyDrivers = await this.locationService.findNearestDrivers(pickupLat, pickupLng, 5);
        if (!nearbyDrivers || nearbyDrivers.length === 0) {
            throw new common_1.BadRequestException('No drivers available nearby');
        }
        const tripCode = Math.floor(100000 + Math.random() * 900000).toString();
        return {
            message: 'Ride requested successfully',
            status: 'requested',
            tripCode,
            notifiedDrivers: nearbyDrivers,
        };
    }
    async acceptRide(driverId, tripId) {
        return { status: 'driver_arriving', tripId, driverId };
    }
    async verifyRideCode(tripId, code) {
        return { status: 'in_progress', tripId };
    }
    async completeRide(tripId) {
        return { status: 'completed', tripId };
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], TripsService);
//# sourceMappingURL=trips.service.js.map