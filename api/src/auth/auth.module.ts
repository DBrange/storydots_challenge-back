import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/users/service/user.service';
import { UserModule } from 'src/users/user.module';

@Global()
  @Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
