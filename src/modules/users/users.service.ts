import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto):Promise<UserDocument> {
    const user = await this.findByEmail(createUserDto.email).catch(() => null);
    if (user) {
      throw new BadGatewayException(`User with email ${createUserDto.email} already exists.`);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return this.userModel.create({
      ...createUserDto,
      password: hash,
    });
  }

  async findAll():Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findByEmail(email: string):Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
