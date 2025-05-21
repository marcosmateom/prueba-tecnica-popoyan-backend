import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepo.find({ relations: ['comments'] });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['comments'] });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async create(data: Partial<User>): Promise<User> {
        try {
            const user = this.userRepo.create(data);
            return await this.userRepo.save(user);
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        try {
            const updateResult = await this.userRepo.update(id, data);
            if (updateResult.affected === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            return this.findOne(id);
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.userRepo.delete(id);
        if ((res.affected ?? 0) === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return true;
    }
}
