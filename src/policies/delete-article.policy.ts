import { AppAbility } from "src/casl/casl-ability.factory";
import { Action } from "src/constants";
import { Article } from "src/constants/entities/role.entity";
import { IPolicyHandler } from "./policy-handler.interface";

export class DeleteArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Article);
  }
}