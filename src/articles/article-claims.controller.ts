import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Permission } from "src/constants";
import { PermissionsGuard, RequirePermissions } from "src/constants/decorators/require-permissions.decorator";
import { Article } from "src/constants/entities/role.entity";

@Controller('articles-claims')
@UseGuards(PermissionsGuard)
export class ArticlesClaimsController {

  @Post()
  @RequirePermissions(Permission.CREATE_ARTICLE)
  create(@Body() body: Partial<Article>) {
    return `Created: ${body.title}`;
  }

  @Get()
  @RequirePermissions(Permission.READ_ARTICLE)
  findAll() {
    return 'All articles';
  }

  @Put(':id')
  @RequirePermissions(Permission.UPDATE_ARTICLE)
  update(@Param('id') id: string) {
    return `Updated ${id}`;
  }

  @Delete(':id')
  // Requires BOTH permissions - user must have all of them
  @RequirePermissions(Permission.DELETE_ARTICLE, Permission.UPDATE_ARTICLE)
  remove(@Param('id') id: string) {
    return `Deleted ${id}`;
  }
}