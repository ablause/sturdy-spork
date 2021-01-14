import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  public async findAll(offset: number, limit: number) {
    return await this.userModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organization')
      .exec();
  }

  public async findOne(_id: string): Promise<User> {
    const user = await this.userModel
      .findById(_id)
      .populate('organisation')
      .exec();

    if (!user) {
      throw new NotFoundException(`User #${_id} not found`);
    }

    return user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({ email })
      .populate('organisation')
      .exec();

    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }

    return user;
  }

  public async findOneByIdentifier(identifier: string): Promise<User> {
    const user = await this.userModel
      .findOne({ identifier })
      .populate('organisation')
      .exec();

    if (!user) {
      throw new NotFoundException(`User #${identifier} not found`);
    }

    return user;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    if (!(this.configService.get('EMAIL_ENABLED') === 'true')) return false;

    const user = await this.findOneByEmail(email);

    if (!user && !user.enabled) return false;

    const token = randomBytes(32).toString('hex');
    const expiration = new Date(Date().valueOf() + 24 * 60 * 60 * 1000);

    return new Promise((resolve) => {
      this.mailerService
        .sendMail({
          to: email,
          subject: 'Reset Password',
          text: `${user.profile.firstName}, Replace this with a website that can pass the token: ${token}`,
        })
        .then(() => {
          user.passwordReset.token = token;
          user.passwordReset.expiration = expiration;

          user.save().then(
            () => resolve(true),
            () => resolve(false),
          );
        })
        .catch(() => resolve(false));
    });
  }

  public async resetPassword(
    identifier: string,
    token: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.findOneByIdentifier(identifier);

    if (user && user.passwordReset && user.enabled !== false) {
      if (user.passwordReset.token === token) {
        user.password = password;
        user.passwordReset = undefined;

        return user.save();
      }
    }

    return undefined;
  }

  public async create(input: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(input);

    return newUser.save();
  }

  public async update(_id: string, input: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      { _id },
      input,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${_id} not found`);
    }

    return existingUser;
  }

  public async remove(_id: string): Promise<unknown> {
    const deletedUser = await this.userModel.findByIdAndRemove(_id);

    return deletedUser;
  }
}
