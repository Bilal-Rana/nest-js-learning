import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // switch to HTTP context
    const request = context.switchToHttp().getRequest();

    // read headers
    const authHeader = request.headers['authorization'];

    console.log('Handler:', context.getHandler().name);
    console.log('Controller:', context.getClass().name);
    console.log('Authorization Header:', authHeader);

    // simple check
    return authHeader === 'Bearer valid-token';
  }
}
