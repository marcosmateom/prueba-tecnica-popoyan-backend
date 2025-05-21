import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty({ message: 'Comment content must not be empty' })
  content: string;

  @Field(() => Int)
  @IsInt()
  userId: number;
}
