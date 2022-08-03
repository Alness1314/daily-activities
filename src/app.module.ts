import { Module } from '@nestjs/common';
import { ConfigKeys } from './utils/keys/config.keys';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DetailsModule } from './details/details.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { ReportsModule } from './reports/reports.module';
import { ProblemsModule } from './problems/problems.module';
import { OtherModule } from './other/other.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, UsersModule, RolesModule, DetailsModule, AuthModule, ActivityModule, ReportsModule, ProblemsModule, OtherModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _config: ConfigService){
    AppModule.port = this._config.get(ConfigKeys.PORT_APP);
  }
}