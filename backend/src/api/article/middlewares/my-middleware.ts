export default (config, { strapi }) => {
  return async (ctx, next) => {
    // ⬅️ Before the controller (request)
    console.log('Request URL:', ctx.request.url);

    await next(); // 👈 the controller is executed here

    // ⬅️ After the controller (response)
    console.log('Response body:', ctx.body);

    // If the controller does ctx.send({ data: ... })
    const data = ctx.body?.data;

    if (data) {
      console.log('Data from controller:', data);
      // Mutation: ✔ Keeps controller logic intact
      //The requestUrl is a mutation that the middleware does.
      ctx.body.data = {
        ...ctx.body?.data,
        requestUrl: ctx.request.url
      };
    }
  };
};



