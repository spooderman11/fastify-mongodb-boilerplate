# Fastify-MongoDB atlas boilerplate

## Introduction

This is a boilerplate project to use Fastify with MongoDB atlas. This is a neat and clean project which can be easily configured to start your very own RestFul API. This project uses [fastify](https://www.fastify.dev/) as web framework and [MongoDB atlas](https://www.mongodb.com/cloud/atlas) as database. You can easily add your own routes and controllers to start your own project.

## Installation

Step 1: Clone this repository

```bash
git clone https://github.com/spooderman11/fastify-mongodb-boilerplate.git
```

Step 2: Install dependencies

~~ - This might get a little difficul if you're using NPM, because this project was soley built using yarn. There might be some issues while installing dependencies using NPM. So I'll recommend you to use yarn instead. Install it using `scoop` or `chocolatey` if you're on Windows. Or you can install it manually by downloading from their [website](https://classic.yarnpkg.com/en/docs/install/). ~~ (Just run `npm install` to convert `yarn.lock` to `package-lock.json`)

```bash
yarn install
```

OR

```bash
npm install
```

Step 3: There is a config.json file in `./src/config` directory. You need to fill in your database credentials there. You can find your database credentials, and some other preferences. The file looks like this:

```json
{
  "prefix": "/api",
  "mongoURL": "MONGO_URL_HERE (Get one from mongo atlas)",
  "port": 5000,
  "host": "HOST"
}
```

- `prefix` is the prefix for the routes. You can leave it blank if you don't want to use any prefix.
- `mongoURL` is the URL to connect to your database. You can find it in your database cluster settings.
- `port` is the port on which you want to run your server.
- `host` is the host you want to run your server on. By default it is `localhost`. You can also set it to `0.0.0.0` if you want to run it on your IP address.

Step 4: Run the server

- You can run the server using `yarn dev` or `npm run dev` command. This will run your server in development mode. It will restart automatically when you make any changes in the code. To run the server in production mode, use `yarn start` or `npm run start` command. It will run the server in production mode.

## Notes

- All the files, and folders besides `config` are pre-configured, and you can use them as templates to add your own routes, models and static files.
- This project is also configured to use @fastiy/cors, and @fastify/static. You can install other plugins/remove these plugins as per your need. You can find more plugins on [Fastify's website](https://fastify.dev/ecosystem/)
- The project has test routes which have docs in them to explain how to use them for your custom routes. Feel free to play around with the testing routes, or duplicate them to make your own routes!
- Sometimes the program can crash without throwing any errors, or logging the routes. To fix this bug/issue, please double check the `url` value in each of your fastify routes, and make sure they don't have the same value as another route eg. `url: '/test'` should not be same as `url: '/test'` in another route. This issue is related to fastify and will be possibly fixed in the future

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)

## Author

- [spooderman11](https://github.com/spooderman11)
- [Flroa](https://github.com/Flroa) (For the idea)

## Acknowledgements

- [Fastify](https://www.fastify.dev/)
- [MongoDB atlas](https://www.mongodb.com/cloud/atlas)

Happy Coding! 🎉
