/**
 * This is a test route, that uses the `prefix` property from `config.json`.
 * The code then exports the route using the `module.exports` function.
 * @param {object} fastify - The Fastify instance.
 * @param {object} opts - The options object.
 * @returns {Promise<void>} - A promise that resolves when the route is defined.
 */

const { prefix } = require("../../config/config.json");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/test/data",
    handler: async (request, reply) => {
      return { hello: "data" };
    },
  });
};
