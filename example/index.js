const { Client } = require('approxi');

// Add configuration.
// If you want to test your bot, consider adding your guild's id in the guilds property.
const config = { commands: { guilds: ['your-guild-id'] } };

// Create a new client and add your config to it.
const client = new Client({ intents: ['GUILDS'] }, config);

// Login to your bot as you would using discord.js.
client.login('discord-bot-token');
