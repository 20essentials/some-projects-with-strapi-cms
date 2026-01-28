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
    }
  ]
};
