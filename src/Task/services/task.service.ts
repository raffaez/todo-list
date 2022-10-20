import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Task } from "../entities/task.entity";


@Injectable()
export class TaskService{
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ){}

  async findAll(): Promise<Task[]>{
    return await this.taskRepository.find();
  }

  async findById(id: number): Promise<Task>{
    const task = this.taskRepository.findOne({
      where: {
        id
      }
    });

    if(!task){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async findByText(text: string): Promise<Task[]>{
    const task = this.taskRepository.find({
      where: {
        text: ILike(`%${text}%`)
      }
    });

    if(!task){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async create(task: Task): Promise<Task>{
    return await this.taskRepository.save(task);
  }

  async update(task: Task): Promise<Task>{
    const taskSearch = await this.findById(task.id);

    if(!taskSearch || !task){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.save(task);
  }

  async delete(id: number): Promise<DeleteResult>{
    const taskSearch = await this.findById(id);

    if(!taskSearch){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.delete(taskSearch);
  }
}