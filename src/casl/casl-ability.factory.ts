import { Injectable } from "@nestjs/common";
import { Action } from "src/constants";
import { Article, User } from "src/constants/entities/role.entity";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isAdmin) {
      // Admin: full access to everything
      can(Action.Manage, 'all');
    } else {
      // Regular user: read-only on everything
      can(Action.Read, 'all');

      // Can update their OWN articles (condition-based)
      can(Action.Update, Article, { authorId: user.id });

      // Cannot delete published articles
      cannot(Action.Delete, Article, { isPublished: true });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}