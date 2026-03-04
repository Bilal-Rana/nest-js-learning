export enum Role {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}

export enum Permission {
  CREATE_ARTICLE = 'create_article',
  READ_ARTICLE   = 'read_article',
  UPDATE_ARTICLE = 'update_article',
  DELETE_ARTICLE = 'delete_article',
}

export enum Action {
  Manage = 'manage', // special: means "any action"
  Create = 'create',
  Read   = 'read',
  Update = 'update',
  Delete = 'delete',
}