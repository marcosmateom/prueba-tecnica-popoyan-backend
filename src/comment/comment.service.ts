import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
    ) { }

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

    async create(data: Partial<Comment>): Promise<Comment> {
        try {
            const comment = this.commentRepo.create(data);
            return await this.commentRepo.save(comment);
        } catch (error) {
            throw new Error(`Failed to create comment: ${error.message}`);
        }
    }

    async update(id: number, data: Partial<Comment>): Promise<Comment> {
        const updateResult = await this.commentRepo.update(id, data);
        if (updateResult.affected === 0) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
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
