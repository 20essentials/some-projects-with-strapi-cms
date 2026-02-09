import type { Core } from '@strapi/strapi';

const conditions = [
  {
    displayName: 'Entity has same name as user',
    name: 'same-name-as-user',
    plugin: 'name of a plugin if created in a plugin',
    handler: user => {
      return { name: user.name };
    }
  },
  {
    displayName: 'Email address from strapi.io',
    name: 'email-strapi-dot-io',
    async handler(user) {
      return user.email.includes('@strapi.io');
    }
  }
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await strapi.admin.services.permission.conditionProvider.registerMany(
      conditions
    );
  }
};
