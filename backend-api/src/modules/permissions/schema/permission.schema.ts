import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Permission {

    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    endpoint: string;

    @Prop({ required: true })
    method: string;

    @Prop({ required: true })
    module: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    deletedBy: Types.ObjectId;

    @Prop({ default: null })
    deletedAt: Date;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
