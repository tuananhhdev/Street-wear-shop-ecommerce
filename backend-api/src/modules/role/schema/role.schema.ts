import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    deletedBy: Types.ObjectId;


    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;


    @Prop({ default: null })
    deletedAt: Date
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
