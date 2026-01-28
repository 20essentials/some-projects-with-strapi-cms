import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }) => ({
    async findArticle(documentId) {
      return strapi.documents('api::article.article').findOne(documentId);
    }
  })
);
