export default ({ env }) => ({
  /*   email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY')
      },
      settings: {
        defaultFrom: 'userFrom@gmail.com',
        defaultReplyTo: 'userReply@gmail.com',
        testAddress: 'emailTest@gmail.com'
      }
    }
  }, */
  'users-permissions': {
    config: {
      ratelimit: {
        enabled: true,
        interval: { min: 5 },
        max: 5
      }
    }
  }
});


