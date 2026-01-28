export default {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/articles/get-random-article',
      handler: 'article.getRandomArticle',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/articles/get-articles-talking-about-cms',
      handler: 'article.getArticlesTalkingAboutCMS',
      config: {
        auth: false
      }
    },
  ]
};
