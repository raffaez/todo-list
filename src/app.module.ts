import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'db_todo',
    entities:[Task],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
