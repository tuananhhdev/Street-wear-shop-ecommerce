import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';


@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:
                ACCESS_TOKEN_SECRET || `KHÔNG LẤY ĐƯỢC ACCESS_TOKEN_SECRET Ở ENV`,
        });
    }

    async validate(decode: any) {
        console.log(`🔐 ProtectStrategy :: validate - Decode:`, decode);

        const user = await this.userModel.findOne({
            _id: decode.sub,
            isDeleted: false
        })
        .populate('roles') // nếu có roles như Prisma
        .lean();

        if (!user) {
            throw new UnauthorizedException(`Không tìm thấy người dùng với ID: ${decode.sub}`);
        }

        
        return user;
    }
}
