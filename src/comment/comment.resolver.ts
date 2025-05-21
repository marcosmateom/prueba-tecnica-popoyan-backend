import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UserService } from '../user/user.service';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService,
    ) { }

    @Query(() => [Comment])
    comments() {
        return this.commentService.findAll();
    }

    @Query(() => Comment)
    comment(@Args('id', { type: () => Int }) id: number) {
        return this.commentService.findOne(id);
    }

    @Mutation(() => Comment)
    async createComment(
        @Args('data') data: CreateCommentInput,
    ) {
        const user = await this.userService.findOne(data.userId);
        return this.commentService.create({ content: data.content, user });
    }

    @Mutation(() => Comment)
    async updateComment(
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: UpdateCommentInput,
    ) {
        return this.commentService.update(id, data);
    }

    @Mutation(() => Boolean)
    deleteComment(@Args('id', { type: () => Int }) id: number) {
        return this.commentService.delete(id);
    }
}
