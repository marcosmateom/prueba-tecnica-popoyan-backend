import { Module } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule],
  providers: [CommentService, CommentResolver]
})
export class CommentModule { }
