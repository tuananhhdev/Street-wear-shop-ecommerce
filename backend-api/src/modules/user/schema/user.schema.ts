import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from 'src/common/types/user/user.type';




@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    gender: Gender;

}

export type UserDocument = User & Document;


export const UserSchema = SchemaFactory.createForClass(User);
