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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): Promise<import("mongoose").Document<unknown, any, import("./entities/user.entity").Users> & import("./entities/user.entity").Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    whoami(req: any): Promise<string>;
    findAllUsers(): Promise<(import("mongoose").Document<unknown, any, import("./entities/user.entity").Users> & import("./entities/user.entity").Users & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findUser(email: string): Promise<import("./entities/user.entity").Users>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, any, import("./entities/user.entity").Users> & import("./entities/user.entity").Users & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
