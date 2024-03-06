import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from '../users/users.module';
import { TeamsModule } from '../teams/teams.module';
import { Users } from '../entities';
import { Teams } from '../entities/team.entity';
import { CategoriesModule } from '../categories/categories.module';
import { PlayersModule } from '../players/players.module';
import { StaffsModule } from '../staffs/staffs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_CLUB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([Users, Teams]),
    UsersModule,
    TeamsModule,
    CategoriesModule,
    PlayersModule,
    StaffsModule
  ],
  controllers: [],
  providers: [],
})
export class RouterModule {}
