import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user')
    private readonly userModel:any,
  ) {}
  async getUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findById(id:any) {
    return await this.userModel.findById(id);
  }

  async findBasicUser(id:any) {
    const { _id, icon, username } = await this.userModel.findById(id);
    return { _id, icon, username };
  }

  async findOAuthUserByThirdPartyId(thirdPartyId:any, provider:any) {
    return await this.userModel.findOne({ provider, thirdPartyId });
  }
  async registerOAuthUserByThirdParty(user:any) {
    return await new this.userModel(user).save();
  }

  // async create(userDTO) {
  //   const { username } = userDTO;
  //   const user = await this.userModel.findOne({ username });
  //   if (user) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   const createdUser = new this.userModel(userDTO);
  //   await createdUser.save();
  //   return this.sanitizeUser(createdUser);
  // }

  // async findByLogin(userDTO) {
  //   const { username, password } = userDTO;
  //   const user = await this.userModel
  //     .findOne({ username })
  //     .select('username password seller created address');
  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }

  //   if (await bcrypt.compare(password, user.password)) {
  //     return this.sanitizeUser(user);
  //   } else {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }
  // }

  // sanitizeUser(user) {
  //   const sanitized = user.toObject();
  //   delete sanitized['password'];
  //   return sanitized;
  //   // return user.depopulate('password');
  // }
}
