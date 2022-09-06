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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt_1 = require("../utils/bcrypt");
let UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async create(email, password, name, role) {
        const users = await this.usersModel.find({ email });
        if (users.length)
            throw new common_1.BadRequestException('Email in use');
        password = (0, bcrypt_1.encodePassword)(password);
        console.log(password);
        const user = await this.usersModel.create({
            email,
            password,
            name,
            role,
        });
        return user.save();
    }
    async findAll() {
        return await this.usersModel.find().exec();
    }
    async findOne(condition) {
        if (!condition) {
            return null;
        }
        return await this.usersModel.findOne(condition).exec();
    }
    async findEmail(email) {
        return await this.usersModel.findOne({ email }).exec();
    }
    async whoami(email) {
        return await this.usersModel.findOne({ email }).exec();
    }
    async update(id, updateUserDto) {
        return await this.usersModel.findByIdAndUpdate({
            _id: id,
        }, {
            $set: updateUserDto,
        }, {
            new: true
        });
    }
    async remove(id) {
        return await this.usersModel.deleteOne({
            _id: id
        }).exec();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map