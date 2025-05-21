import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UserService } from '../user/user.service';
import { Comment } from './comment.entity';

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
        @Args('content') content: string,
        @Args('userId', { type: () => Int }) userId: number,
    ) {
        const user = await this.userService.findOne(userId);
        return this.commentService.create({ content, user });
    }

    @Mutation(() => Comment)
    updateComment(
        @Args('id', { type: () => Int }) id: number,
        @Args('content') content: string,
    ) {
        return this.commentService.update(id, { content });
    }

    @Mutation(() => Boolean)
    deleteComment(@Args('id', { type: () => Int }) id: number) {
        return this.commentService.delete(id);
    }
}
