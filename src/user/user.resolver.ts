import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    return this.userService.create({ name, email });
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name: string,
    @Args('email', { nullable: true }) email: string,
  ) {
    return this.userService.update(id, { name, email });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
