import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from 'src/common/types/user/user.type';


@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, index: true })
    fullName: string;

    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: false, default: null })
    avatar: string

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    gender: Gender;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    deletedBy: string;

    @Prop({ default: null })
    deletedAt: Date

}

export type UserDocument = User & Document;


export const UserSchema = SchemaFactory.createForClass(User);
