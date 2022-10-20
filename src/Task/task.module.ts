import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "./controllers/task.controller";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule]
})
export class TaskModule{}