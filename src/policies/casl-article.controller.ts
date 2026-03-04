import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PoliciesGuard } from "./policies.guard";
import { CheckPolicies } from "./policy-handler.interface";
import { AppAbility } from "src/casl/casl-ability.factory";
import { Action } from "src/constants";
import { Article } from "src/constants/entities/role.entity";
import { CreateArticlePolicyHandler } from "./create-article.policy";
import { DeleteArticlePolicyHandler } from "./delete-article.policy";

@Controller('articles-casl')
export class ArticlesCaslController {

  // ── Functional (inline lambda) approach ──
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  findAll() {
    return 'All articles (CASL)';
  }

  // ── Class-based handler approach ──
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new CreateArticlePolicyHandler())
  create(@Body() body: Partial<Article>) {
    return `Created: ${body.title}`;
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteArticlePolicyHandler())
  remove(@Param('id') id: string) {
    return `Deleted article ${id}`;
  }

  // ── Multiple policies on one route ──
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) => ability.can(Action.Read,   Article),
    (ability: AppAbility) => ability.can(Action.Update, Article),
  )
  update(@Param('id') id: string) {
    return `Updated ${id}`;
  }
}