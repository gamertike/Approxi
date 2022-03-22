# Approxi

A easy to use [Discord.js](https://discord.js.org) framework.

## About

Approxi is a powerful and easy to use [Discord.js](https://discord.js.org) framework that allows your code to be as minimal as possible.

- Built in typescript.
- Built on top of [Discord.js](https://discord.js.org).
- Supports slash commands.
- Easy configuration.

## Useful links

- [Discord.js documentation](https://discord.js.org/#/docs)

## Getting started

Firstly lets create a `index.js` file and add the following code. This will be your main file for your discord bot.

```js
const { Client } = require('approxi');

// Add configuration.
// If you want to test your bot, consider adding your guild's id in the guilds property.
const config = { commands: { guilds: ['your-guild-id'] } };

// Create a new client and add your config to it.
const client = new Client({ intents: ['GUILDS'] }, config);

// Login to your bot as you would using discord.js.
client.login('discord-bot-token');
```

Now lets create a directory named `commands`, This will be where all your commands will be located.

Inside the `commands` directory, Add a new file named something like `ping.js`, In this guide we will make a ping command.

Inside the file add the following:
```js
const { Command } = require('approxi');

// Create a new command.
module.exports = new Command(
    // Add command data.
    { name: 'ping', description: 'The ping command.' },
    // Add a function to run when this command is used.
	(interaction) => interaction.reply('Pong!')
);
```

After that, Lets make a new directory named `events`, This will be where all your events will be located.

Inside the `events` directory, Add a new file named something like `ready.js`, In this guide we will make a ready event.

Inside the file add the following:
```js
const { Event } = require('approxi');

// Create a new event.
module.exports = new Event(
	// Add event data.
	{ name: 'ready', once: true },
	// Add a function to run when this event is emitted.
	(client) => console.log(`Logged in as ${client.user.tag}`)
);
```

Now that we have a command and a event ready, We can now run the `index.js` file!

Congratulations! You have made your very first discord bot using the Approxi framework!

## TODO

- Add documentation.
- Create CLI.
