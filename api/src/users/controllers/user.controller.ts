import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';
import { UserUpdateDTO } from '../dto/userUpdate.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicAccess()
  @Get('all')
  public async getUsers() {
    return await this.userService.findAllUsers();
  }

  @PublicAccess()
  @Get(':userId')
  public async getUserById(@Param('userId') id: string) {
    return await this.userService.findUserById(id);
  }

  @Post('register')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Put('edit/:userId')
  public async updateUser(
    @Param('userId') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete('delete/:userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }
}
