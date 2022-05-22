const Discord = require('discord.js');
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');
const config = require('./config.json');
const { initialiseLogger } = require('./logger.js');
const client = new Discord.Client();
const logger = initialiseLogger(config, winston, Elasticsearch);
const got = require('got');
const fs = require("fs");

client.login(config.token);
client.once('ready', () => {
  logger.info('IpChangeNotifierBot logged in successfully!');

  setInterval(async () => {
    // Check the ip every interval
    let currentPublicIpAddress;

    // Scrape the ip
    try {
      const ipApiUrl = 'https://api.ipify.org';

      // Returns a string of the ip address
      const response = await got(ipApiUrl);
      currentPublicIpAddress = response.body;
    } catch (error) {
      logger.error('Failed to get the public ip address', error);
    }

    if (currentPublicIpAddress.length > 0) {
      try {
        // Check if the ip address has changed
        let oldIpAddress;

        const fileExists = fs.existsSync("ip.txt");
        if (fileExists) {
          oldIpAddress = fs.readFileSync("ip.txt", "utf-8");
        } else {
          // If it doesn't exist, create the file
          fs.writeFileSync("ip.txt", '');
          logger.info("Successfully created empty ip file.");
        }

        if (currentPublicIpAddress !== oldIpAddress) {
          // If it has changed, send a DM
          const user = await client.users.fetch(config.discord_user_id).catch(() => null);

          if (!user) {
            throw new Error('User not found');
          }

          await user.send(`Ip address has changed from ${oldIpAddress} to ${currentPublicIpAddress}`).catch(() => {
            throw new Error('User has DMs closed or has no mutual servers with the bot');
          });

          // Update the saved ip address
          fs.writeFileSync("ip.txt", currentPublicIpAddress);
          logger.info(`Successfully recorded new ip address, changed from ${oldIpAddress} to ${currentPublicIpAddress}`);
        }

      } catch (error) {
        logger.error('Failed to check if the ip address has changed and/or send a message', error);
      }
    }
  }, 1000 * 60 * 10); // every ten minutes
});
