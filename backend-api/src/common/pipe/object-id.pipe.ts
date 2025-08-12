import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: string) {

        if (typeof value !== 'string') {
            throw new BadRequestException('ID phải là một chuỗi');
        }

        if (!isValidObjectId(value)) {
            throw new BadRequestException('ID không hợp lệ: phải là một chuỗi ObjectId của MongoDB');
        }
        return value;
    }
}
