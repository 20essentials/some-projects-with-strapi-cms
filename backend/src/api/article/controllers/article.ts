import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }) => ({
    async getRandomArticle(ctx) {
      try {
        const articles = await strapi.documents('api::article.article').findMany({
          fields: ['category', 'title', 'content']
        });

        if (!articles || articles.length === 0) {
          return ctx.notFound('No articles found');
        }

        const randomIndex = Math.floor(Math.random() * articles.length);
        const randomArticle = articles[randomIndex];
        ctx.send({ data: randomArticle });
      } catch (error) {
        console.error(error);
        ctx.internalServerError('Error fetching random article');
      }
    },
    async getArticlesTalkingAboutCMS(ctx) {
      try {
        const articles = await strapi.service('api::article.article').customFind({
          filters: {
            category: {
              $in: ['CMS']
            }
          }
        });

        if (!articles || articles.length === 0) {
          return ctx.notFound('No articles found it');
        }

        ctx.send({ data: articles });
      } catch (error) {
        console.error(error);
        ctx.internalServerError('Error fetching articles');
      }
    }
  })
);
