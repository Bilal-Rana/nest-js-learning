import { Permission, Role } from "..";

export class User {
  id!: number;
  name!: string;
  isAdmin!: boolean;
  roles!: Role[];
  permissions!: Permission[]; // for claims-based approach
}

export class Article {
  id!: number;
  title!: string;
  isPublished!: boolean;
  authorId!: number;
}