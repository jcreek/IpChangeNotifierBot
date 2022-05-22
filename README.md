# IpChangeNotifierBot

A discord bot to notify you when your public IP address changes

## Running the bot using Docker

### Installing Docker

If you're on Windows, visit [this website](https://docs.docker.com/docker-for-windows/install/) and download and install Docker Desktop. You'll probably need to install WSL and do some Windows updates. Once it's all installed you'll get a lovely GUI that you can use if you want to.

For Mac and Linux users, Google is your friend here.

### Dockerize the bot

To build a docker image, open a command window in the project directory and run:

`docker build -t ipbot .`

For a sanity check, you can run `docker images` and it should be displayed in that list.

### Running the Docker container

Running the bot with --detach runs the container in detatched mode (as in it runs in the background). If you want to see what is happening, remove that option.

`docker run --detach --name ipbot ipbot`

You can use CTRL+C to exit out of this command window. If you're using Windows, Docker Desktop will now show your bot under 'Containers/Apps', from where you can easily stop and start it using the GUI.

### Updating

If doing it manually, in the folder with all the files run:

```sh
docker stop ipbot
docker rm ipbot
docker image rm ipbot
docker build -t ipbot .
docker run --detach --name ipbot ipbot
```
