import { IsMongoId, IsNotEmpty } from "class-validator";

export class softDeleteUserDto {
    @IsNotEmpty({ message: 'ID người dùng không được bỏ trống' })
    @IsMongoId()
    id: string
}