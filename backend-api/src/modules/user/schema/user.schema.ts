import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from 'src/common/types/user/user.type';


@Schema({
    timestamps: true,
    versionKey: false
})
export class User {
    @Prop({ required: true, index: true })
    fullName: string;

    @Prop({ required: true, index: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false, default: null })
    phoneNumber: string;

    @Prop({ required: false, default: null })
    avatar: string

    @Prop({ required: false, default: null })
    address: string;

    @Prop({ required: false, default: null })
    gender: Gender;

    @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
    roleId: Types.ObjectId

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    deletedBy: Types.ObjectId;

    @Prop({ default: null })
    deletedAt: Date

}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
    { email: 1 },
    { unique: true, partialFilterExpression: { isDeleted: false } }
);


UserSchema.virtual('role', {
    ref: 'Role',
    localField: 'roleId',
    foreignField: '_id',
    justOne: true,
});
