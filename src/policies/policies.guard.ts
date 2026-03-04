import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { CHECK_POLICIES_KEY, PolicyHandler } from "./policy-handler.interface";
import { User } from "src/constants/entities/role.entity";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Get policy handlers attached to the route
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    // 2. Get current user from request
    const { user }: { user: User } = context.switchToHttp().getRequest();

    // 3. Build ability object for this user
    const ability = this.caslAbilityFactory.createForUser(user);

    // 4. Every policy handler must return true
    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility): boolean {
    if (typeof handler === 'function') {
      return handler(ability); // functional handler
    }
    return handler.handle(ability); // class-based handler
  }
}