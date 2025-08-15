import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { buildSlug } from 'src/common/utils/build-slug.util';

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ required: true, trim: true, unique: true, index: true })
  name: string;

  @Prop({ required: false, trim: true, unique: true, index: true })
  slug: string;

  @Prop({ required: false, trim: true, default: null })
  description: string;

  @Prop({ required: false, default: null })
  image: string;

  @Prop({ default: false, index: true, select: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null, select: false })
  deletedBy: Types.ObjectId;

  @Prop({ default: null, select: false })
  deletedAt: Date;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('validate', function (next) {
  if (this.isModified('name')) {
    this.slug = buildSlug(this.name);
  }
  next();
});

CategorySchema.virtual('status').get(function () {
  return this.isDeleted ? 'Inactive' : 'Active';
});
