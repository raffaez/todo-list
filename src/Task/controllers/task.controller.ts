import { HttpStatus, ParseIntPipe } from "@nestjs/common";
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { DeleteResult } from "typeorm";
import { Task } from "../entities/task.entity";
import { TaskService } from "../services/task.service";

@Controller('/tasks')
export class TaskController{
  constructor(
    private readonly taskService: TaskService
  ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Task[]>{
    return this.taskService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task>{
    return this.taskService.findById(id);
  }

  @Get('/text/:text')
  @HttpCode(HttpStatus.OK)
  findByText(
    @Param('text') text: string
  ): Promise<Task[]>{
    return this.taskService.findByText(text);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() task: Task
  ): Promise<Task>{
    return this.taskService.create(task);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(
    @Body() task: Task
  ): Promise<Task>{
    return this.taskService.update(task);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<DeleteResult>{
    return this.taskService.delete(id);
  }
}