// Import required modules
const fastify = require("fastify")({
  logger: false,
  ignoreTrailingSlash: true,
});
const fastifyCors = require("@fastify/cors");
const fastifyStatic = require("@fastify/static");
const path = require("path");
const fs = require("fs");
const { mongoURL, host, port } = require("./config/config.json");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(mongoURL);
db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to db");
});

// Function to register CORS, static files, and error handler
const registerfunc = async () => {
  fastify.register(fastifyCors, {
    origin: "*",
  });
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/public/",
  });
  fastify.setErrorHandler(function (error, request, reply) {
    console.log(error);
    reply.send(error);
  });
};

// Object to store registered routes
let routes = {};

// Function to recursively register routes from files in a directory
const registerRoutes = async (folderPath = __dirname) => {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      registerRoutes(filePath);
    } else if (stat.isFile() && file.endsWith(".js")) {
      try {
        const route = require(filePath);
        fastify.register(route);
        routes[file] = "OK";
      } catch (e) {
        routes[file] = "ERROR - " + e;
      }
    }
  });
};

// Function to log registered routes to a file
const logRoutes = async () => {
  const logPath = path.join(__dirname, "routes.log");
  const logFile = fs.createWriteStream(logPath, { flags: "w" });
  logFile.write("Routes:\n");
  logFile.write(JSON.stringify(routes, null, 2));
  logFile.write("\n\n");
  console.log("Log file created: " + logPath);
};

// Add a hook to log incoming and served requests
fastify.addHook("onRequest", (req, reply, done) => {
  console.log(`\n🔔 Incoming Request:
  URL: ${req.url}
  Method: ${req.method}
  IP: ${req.ip}`);

  reply.header("x-powered-by", "Fastify");
  done();

  console.log(`\n✅ Served Request:
  URL: ${req.url}
  Method: ${req.method}`);
});

// Start the server
(async () => {
  await registerRoutes(path.join(__dirname, "routes"));
  await logRoutes();
  await registerfunc();

  const PORT = port;
  const HOST = host;

  try {
    await fastify.listen({
      port: PORT,
      host: HOST,
    });
    console.log(`Server listening at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
