import * as mongoose from 'mongoose';
export declare const UsersSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    email: string;
    password: string;
    name: string;
    role: any[];
    refreshToken?: string;
    refreshTokenExp?: string;
}>;
