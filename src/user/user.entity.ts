import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../comment/comment.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];
}
