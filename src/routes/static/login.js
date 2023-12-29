module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/login",
    handler: async (request, reply) => {
      return reply.sendFile("login.html");
    },
  });
};
