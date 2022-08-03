import { RolesService } from './../roles/services/roles.service';
import { RolesModule } from './../roles/roles.module';
import { DetailsModule } from './../details/details.module';
import { JwtStrategy } from './strategies/jwt-payload.strategy';
import { ConfigKeys } from './../utils/keys/config.keys';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './../users/services/users.service';
import { UsersModule } from './../users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) =>{
      return {
        secret: config.get(ConfigKeys.JWT_SECRET),
          signOptions: {
            expiresIn: '2h',
          }
      }
    },
  }),
  forwardRef(()=>UsersModule),
  DetailsModule,
  
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, RolesService],
  exports:[JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
