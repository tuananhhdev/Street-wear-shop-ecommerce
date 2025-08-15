import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false
})
export class UserPermission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Permission', required: true })
  permissionId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  grantedBy: Types.ObjectId; // Admin đã cấp quyền

  @Prop({ type: String, enum: ['grant', 'revoke'], required: true })
  action: string; // grant: cấp thêm quyền, revoke: thu hồi quyền

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  deletedBy: Types.ObjectId;

  @Prop({ default: null })
  deletedAt: Date;
}

export type UserPermissionDocument = UserPermission & Document;
export const UserPermissionSchema = SchemaFactory.createForClass(UserPermission);
