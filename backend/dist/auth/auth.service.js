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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("../utils/bcrypt");
const token_service_1 = require("../token/token.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, tokenService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findEmail(email);
        if (user) {
            const comparePass = (0, bcrypt_1.comparePasswords)(password, user.password);
            if (comparePass) {
                const { _id, name, email, role } = user;
                console.log('Correct password');
                return { id: _id, name, email, role };
            }
            else {
                console.log('Password is wrong!');
            }
        }
        console.log('User Validation failed!');
        return null;
    }
    async signin(user) {
        const token = this.jwtService.sign(user);
        await this.tokenService.saveToken(token, user.email);
        return {
            token,
            user,
        };
    }
    async signToken(token) {
        const user = await this.tokenService.getUserByToken(token);
        if (user) {
            return this.signin(user.user);
        }
        else {
            return new common_1.HttpException({
                errorMessage: 'Invalid token!',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        token_service_1.TokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map