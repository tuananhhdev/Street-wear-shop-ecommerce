import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    avatar?: string;
    address?: string;
    gender?: Gender;
    roleId: Types.ObjectId;
    role?: {
        _id: Types.ObjectId;
        name: string;
        description: string;
    };
    isDeleted: boolean;
    deletedBy?: Types.ObjectId;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}