import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const imageUploadOptions = (
    maxFileSizeMB: number = 5,
    allowedTypes: RegExp = /^image\/(png|jpe?g|webp|gif)$/
) => ({
    storage: memoryStorage(),
    limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!allowedTypes.test(file.mimetype)) {
            return cb(new BadRequestException('File phải là ảnh hợp lệ'), false);
        }
        cb(null, true);
    },
});
