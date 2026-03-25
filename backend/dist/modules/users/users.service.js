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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const saved_place_entity_1 = require("./saved-place.entity");
let UsersService = class UsersService {
    constructor(userRepository, savedPlaceRepository) {
        this.userRepository = userRepository;
        this.savedPlaceRepository = savedPlaceRepository;
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async create(userDto) {
        const existingUser = await this.findByEmail(userDto.email);
        if (existingUser) {
            throw new common_1.ConflictException("L'adresse email est deja utilisee.");
        }
        const newUser = this.userRepository.create(userDto);
        return this.userRepository.save(newUser);
    }
    async getSavedPlaces(userId) {
        return this.savedPlaceRepository.find({ where: { user: { id: userId } } });
    }
    async addSavedPlace(userId, placeData) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur introuvable');
        }
        const newPlace = this.savedPlaceRepository.create({ ...placeData, user });
        return this.savedPlaceRepository.save(newPlace);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(saved_place_entity_1.SavedPlace)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map