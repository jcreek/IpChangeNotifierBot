# IpChangeNotifierBot

A discord bot to notify you when your public IP address changes. For production use you should ensure it is installed on a server running on the network whose IP address you wish to monitor.

## Debugging the bot locally

Once you've downloaded a zip of or cloned this repo you should specify your own `discord_user_id`, `elasticsearch_address` and `token` in the `config.json`. You can get your Discord user ID from the Discord app (see Google for the most up to date instructions) and your bot token from the [Discord Developer Portal](https://discord.com/developers/) once you've set up an Application and added a Bot to it.

To be able to run and debug this project, my recommended option is to ensure [Docker](https://docs.docker.com/get-docker/) is running on your PC, open the root folder in Visual Studio Code, then when it prompts you at the bottom right of the window, click on 'Reopen in Container'. The very first time you open it it will take a little while to load, after which you will have access to a VSCode window with all the dependencies installed for you behind the scenes using Docker.

To run and debug the project you can then use VSCode's built-in debugging tools, from the `Run and Debug` button on the left hand side.

## Running the bot using Docker for production

When you want to deploy your bot ready for use, my recommended option is to use Docker, as this keeps dependencies easily managed, and makes it very easy to start and stop the bot, as well as updating it if required in the future.

### Dockerize the bot

To build a docker image, copy the project files to your server, then open a command window in the project directory and run:

`docker build -t ipbot .`

For a sanity check, you can run `docker images` and it should be displayed in that list.

### Running the Docker container

Running the bot with `--detach` runs the container in detatched mode (as in it runs in the background). If you want to see what is happening (i.e. real-time logs), remove that option.

`docker run --detach --name ipbot ipbot`

You can use CTRL+C to exit out of this command window. If you're using Windows, Docker Desktop will now show your bot under 'Containers/Apps', from where you can easily stop and start it using the GUI.

### Updating

If doing it manually, on the server in the folder with all the files run:

```sh
docker stop ipbot
docker rm ipbot
docker image rm ipbot
docker build -t ipbot .
docker run --detach --name ipbot ipbot
```
