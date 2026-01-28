import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }) => ({
    async customFind(obj: any) {
      console.log('This a simple simulation of a service:custom find!');
      return strapi.documents('api::article.article').findMany(obj);
    }
  })
);
