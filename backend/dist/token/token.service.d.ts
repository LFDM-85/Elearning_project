/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Token } from './token.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class TokenService {
    private tokenModel;
    private usersService;
    private authService;
    constructor(tokenModel: Model<Token>, usersService: UsersService, authService: AuthService);
    saveToken(hash: string, useremail: string): Promise<import("mongoose").Document<unknown, any, Token> & Token & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    refreshToken(oldToken: string): Promise<HttpException | {
        token: string;
        user: import("../users/entities/user.entity").Users;
    }>;
    getUserByToken(token: string): Promise<{
        token: string;
        user: import("../users/entities/user.entity").Users;
    }>;
}
