import {
  Controller, Get, Post, Put, Delete,
  Body, Param, UseGuards,
} from '@nestjs/common';
import { Role } from 'src/constants';
import { Roles, RolesGuard } from 'src/constants/decorators/roles.decorator';
import { Article } from 'src/constants/entities/role.entity';

@Controller('articles')
@UseGuards(RolesGuard) // apply guard to entire controller
export class ArticlesRbacController {

  @Get()
  findAll() {
    return 'Returns all articles';
  }

  @Post()
  @Roles(Role.Admin)
  create(@Body() body: Partial<Article>) {
    return `Admin created article: ${body.title}`;
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Moderator)
  update(@Param('id') id: string, @Body() body: Partial<Article>) {
    return `Updated article ${id}`;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return `Deleted article ${id}`;
  }
}