/**
 * Defines a Fastify route for the homepage.
 *
 * @param {object} fastify - The Fastify instance.
 * @param {object} opts - The options object.
 * @returns {Promise<void>} - A promise that resolves when the route is defined.
 */
module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      return reply.sendFile("index.html");
    },
  });
};
