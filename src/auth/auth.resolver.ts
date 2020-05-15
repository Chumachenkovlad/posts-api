import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthPayload } from './auth-payload.model';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';
import { RegisterInput } from './register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AuthPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthPayload> {
    const { email, password } = loginInput;
    return this.authService.login(email, password);
  }

  @Mutation(returns => AuthPayload)
  async register(
    @Args('registerInput', { type: () => RegisterInput })
    registerInput: RegisterInput
  ) {
    return this.authService.register(registerInput);
  }
}
