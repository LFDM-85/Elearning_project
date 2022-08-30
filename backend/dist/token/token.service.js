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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("../auth/auth.service");
let TokenService = class TokenService {
    constructor(tokenModel, usersService, authService) {
        this.tokenModel = tokenModel;
        this.usersService = usersService;
        this.authService = authService;
    }
    async saveToken(hash, useremail) {
        const dbToken = await this.tokenModel.findOne({ useremail: useremail });
        if (dbToken) {
            await this.tokenModel.deleteMany({ _id: dbToken.id });
            const newToken = await this.tokenModel.create({
                hash,
                useremail,
            });
            return newToken.save();
        }
        else {
            const newToken = await this.tokenModel.create({
                hash,
                useremail,
            });
            return newToken.save();
        }
    }
    async refreshToken(oldToken) {
        const dbToken = await this.tokenModel.findOne({ hash: oldToken });
        if (dbToken) {
            const user = await this.usersService.findEmail(dbToken.useremail);
            return this.authService.signin(user.toJSON());
        }
        else {
            return new common_1.HttpException({
                errorMessage: 'Invalid token! You are not sign in!',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getUserByToken(token) {
        const dbToken = await this.tokenModel.findOne({ hash: token });
        if (dbToken) {
            const user = await this.usersService.findEmail(dbToken.useremail);
            return this.authService.signin(user);
        }
        else {
            return null;
        }
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Token')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map