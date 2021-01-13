import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDataModule } from '../users-data/users-data.module';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersDataModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
