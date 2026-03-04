import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Permission } from "..";
import { Reflector } from "@nestjs/core";
import { User } from "../entities/role.entity";

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

// guards/permissions.guard.ts
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user }: { user: User } = context.switchToHttp().getRequest();

    // Every required permission must be present on the user
    return requiredPermissions.every((perm) =>
      user.permissions?.includes(perm),
    );
  }
}