import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Task } from "../entities/task.entity";


@Injectable()
export class TaskService{
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ){}

  /**
   * @desc Finds all tasks in the database
   * @returns A promise that contains an array of Task objects
   * @example
   * findAll() // All tasks in the database will be returned
   */
  async findAll(): Promise<Task[]>{
    return await this.taskRepository.find();
  }

  /**
   * @desc Finds a task in the database by its ID
   * @param id The id of the task to be found
   * @returns A promise that contains a Task object
   * @throws HttpException In case the id received is not found in the database
   * @example
   * findById(3) // The task referenced by id 3 will be returned
   */
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

  /**
   * @desc Finds tasks in the database that contain the given text
   * @param text The text of the tasks to be found
   * @returns A promise that contains an array of Task object
   * @throws HttpException In case the text received is not found in the database
   * @example
   * findByText('st') // All tasks whose text contains 'st' will be returned
   */
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

  /**
   * @desc Saves a task into the database
   * @param task The task to be saved
   * @returns A promise that contains a Task object
   * @example
   * create({"text":"Water plants"}) // Will create the object 
   * {
   * "text": "Water plants",
   * "id": 1,
   * "isDone": false,
   * "date": "2022-10-20T16:32:51.812Z"
   * }
   */
  async create(task: Task): Promise<Task>{
    return await this.taskRepository.save(task);
  }

  /**
   * @desc Overrides a task in the database with the given parameters, using the given id to locate the task to be updated
   * @param task The task to be updated
   * @returns A promise that contains the updated task
   * @throws HttpException In case the task received is not found in the database or no task is received
   * @example
   * update({"id": 1, "text":"Water plants"}) // The task referenced by id 1 will have its text overrided to "Water plants"
   */
  async update(task: Task): Promise<Task>{
    const taskSearch = await this.findById(task.id);

    if(!taskSearch || !task){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.save(task);
  }

  /**
   * @desc Removes a task from the database
   * @param id The id of the task to be removed
   * @returns No content
   * @throws HttpException In case the id received is not found in the database
   * @example
   * delete(1) // The task referenced by id 1 will be removed
   */
  async delete(id: number): Promise<DeleteResult>{
    const taskSearch = await this.findById(id);

    if(!taskSearch){
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.delete(taskSearch);
  }
}