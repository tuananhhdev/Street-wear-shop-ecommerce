import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/schema/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenService } from './token/token.service';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { RoleDocument } from '../role/schema/role.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        @InjectModel('Role') private readonly roleModel: Model<RoleDocument>,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService
    ) { }

    async register(dto: RegisterAuthDto) {
        const userExist = await this.userModel.findOne({ email: dto.email });
        if (userExist) throw new BadRequestException("Tài khoản đã tồn tại, vui lòng đăng ký tài khoản khác");

        const customerRole = await this.roleModel.findOne({ name: 'Customer' });
        if (!customerRole) throw new BadRequestException("Role Customer không tồn tại trong hệ thống");

        const user = await this.userModel.create({
            ...dto,
            password: bcrypt.hashSync(dto.password, bcrypt.genSaltSync(10)),
            roleId: customerRole._id
        });

        const { password, __v, roleId, ...newUser } = user.toObject();

        return {
            ...newUser,
            role: customerRole?.name
        };
    }




    async login(dto: LoginAuthDto) {
        const userExist = await this.userModel.findOne({ email: dto.email }).lean()
        if (!userExist) {
            throw new BadRequestException("Tài khoản chưa tồn tại, vui lòng đăng ký tài khoản mới")
        }
        if (!userExist.password) {
            throw new BadRequestException("Tài khoản không hợp lệ, vui lòng kiểm tra lại hoặc đăng ký tài khoản mới")
        }

        const isPassword = bcrypt.compareSync(dto.password, userExist.password)
        if (!isPassword) {
            throw new BadRequestException("Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra lại")
        }

        const tokens = this.tokenService.createTokens(userExist._id.toString());

        return tokens
    }

    async refreshToken(dto: RefreshTokenAuthDto) {

        let decodedAccessToken: any;
        let decodedRefreshToken: any;

        try {
            decodedRefreshToken = this.jwtService.verify(dto.refreshToken, {
                secret: REFRESH_TOKEN_SECRET,
            });

            decodedAccessToken = this.jwtService.verify(dto.accessToken, {
                secret: ACCESS_TOKEN_SECRET,
                ignoreExpiration: true,
            });
        } catch (error) {
            throw new BadRequestException(
                'Refresh token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại',
            );
        }

        if (decodedRefreshToken.sub !== decodedAccessToken.sub) {
            throw new UnauthorizedException('Token không hợp lệ');
        }

        const tokens = this.tokenService.createTokens(decodedAccessToken.sub);

        return tokens
    }

}
