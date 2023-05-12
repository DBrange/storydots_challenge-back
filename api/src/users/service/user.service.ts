import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserDTO } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDTO } from '../dto/userUpdate.dto';
import { IFindBy } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      if (!users.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No user found',
        });
      }

      return users;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No user found',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async findBy({ key, value }: IFindBy): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ [key]: value })
        .getOne();

      // if (!user) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No user found for login',
      //   });
      // }

      return user;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }
  async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      const newUser: UserEntity = await this.userRepository.create(body);
      const newUserPassword = await bcrypt.hash(
        newUser.password,
        +process.env.HASH_SALT,
      );
      newUser.password = newUserPassword;
      const user: UserEntity = await this.userRepository.save(newUser);

      return user;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async updateUser(id: string, body: UserUpdateDTO): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);

      if (!user.affected) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update user',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (!user.affected) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete user',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createAsignaturError(err.message);
    }
  }
}
