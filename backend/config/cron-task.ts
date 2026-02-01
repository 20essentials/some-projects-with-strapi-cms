export default {
  cleanLogs: {
    task: async ({ strapi }) => {
      // Calculate the date 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Delete logs older than 30 days
      //Example
 /*      await strapi.db.query('api::log.log').deleteMany({
        where: {
          createdAt: { $lt: thirtyDaysAgo },
        },
      }); */

      strapi.log.info('🧹 Old logs successfully cleaned up');
    },
    options: {
      // Runs every day at 10:00 PM (22:00) Italy time
      rule: '0 0 22 * * *',
      tz: 'Europe/Rome',
    },
  },
};
