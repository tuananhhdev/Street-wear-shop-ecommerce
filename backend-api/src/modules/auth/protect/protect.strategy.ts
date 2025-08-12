// src/auth/strategies/protect.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:
                ACCESS_TOKEN_SECRET ||
                `KHÔNG LẤY ĐƯỢC ACCESS_TOKEN_SECRET Ở ENV`,
        });
    }

    async validate(payload: any) {
        console.log(`🔐 ProtectStrategy :: validate - Payload:`, payload);

        let userId: Types.ObjectId;
        try {
            userId = new Types.ObjectId(payload.sub);
        } catch {
            throw new UnauthorizedException(`ID không hợp lệ: ${payload.sub}`);
        }

        const user = await this.userModel
            .findOne({
                _id: userId,
                isDeleted: false,
            })
            .populate({
                path: 'role',
                match: { isActive: true },
            })
            .lean();

        if (!user) {
            throw new UnauthorizedException(
                `Không tìm thấy người dùng với ID: ${payload.sub}`,
            );
        }

        return user;
    }
}
