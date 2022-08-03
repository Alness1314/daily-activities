import { RolesService } from 'src/roles/services/roles.service';
import { AuthModule } from './../auth/auth.module';
import { DetailsModule } from './../details/details.module';
import { Role } from './../roles/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Role]), DetailsModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {
}
