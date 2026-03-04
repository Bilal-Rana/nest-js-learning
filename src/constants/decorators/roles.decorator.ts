import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '..';
import { User } from '../entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Read the required roles from the route metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // method-level metadata first
      context.getClass(),   // fallback to class-level
    ]);

    // 2. If no roles required, allow the request
    if (!requiredRoles) return true;

    // 3. Get the user from the request (set by your AuthGuard/JWT guard)
    const { user }: { user: User } = context.switchToHttp().getRequest();

    // 4. Check if the user has at least ONE of the required roles
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}