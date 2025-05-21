import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id }, relations: ['user'] });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  create(data: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepo.create(data);
    return this.commentRepo.save(comment);
  }

  async update(id: number, data: Partial<Comment>): Promise<Comment> {
    await this.commentRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.commentRepo.delete(id);
    if ((res.affected ?? 0) === 0) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
        return true;
  }
}
