import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from 'src/modules/permissions/schema/permission.schema';
import { Role } from 'src/modules/role/schema/role.schema';

@Schema({
    timestamps: true,
    versionKey: false
})
export class RolePermission {
    @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
    roleId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Permission.name, required: true })
    permissionId: Types.ObjectId;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    deletedBy: Types.ObjectId;

    @Prop({ default: null })
    deletedAt: Date;
}

export type RolePermissionDocument = RolePermission & Document;
export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);
