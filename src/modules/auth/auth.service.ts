import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { UserDocument } from '../users/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { LoginPayload } from './dto/loginPayload.dto';
import { ReturnUserDto } from '../users/dto/return-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);
        
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
           throw new NotFoundException('Email or Password invalid');
        }
        
        return {
            acessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user),
        };
    }
}