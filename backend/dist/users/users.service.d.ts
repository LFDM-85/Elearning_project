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
import { Model } from 'mongoose';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<Users>);
    create(email: string, password: string, name: string, role: string[]): Promise<import("mongoose").Document<unknown, any, Users> & Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, any, Users> & Users & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(condition: any): Promise<Users>;
    findEmail(email: string): Promise<import("mongoose").Document<unknown, any, Users> & Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    whoami(email: string): Promise<import("mongoose").Document<unknown, any, Users> & Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, any, Users> & Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
