import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/users/service/user.service';
import { ISingJWT, PayloadToken } from '../interfaces/auth.interface';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string) {
    const userByUserName = await this.userService.findBy({
      key: 'username',
      value: username,
    });

    const userByUserEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUserName) {
      const match = await bcrypt.compare(password, userByUserName.password);
      if (match) return userByUserName;
    }
    if (userByUserEmail) {
      const match = await bcrypt.compare(password, userByUserEmail.password);
      if (match) return userByUserEmail;
    }
  }

  public singJWT({ payload, secret, expires }: ISingJWT) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<any>{
    const getUser = await this.userService.findUserById(user.id)

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id
    }

    return {
      accessToken: this.singJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h'
      }),
      user
    }
  }
}
