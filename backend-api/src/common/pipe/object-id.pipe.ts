import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: string) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException('ID không hợp lệ: phải là một chuỗi ObjectId của MongoDB');
        }
        return value;
    }
}
