const { Command } = require('approxi');

// Create a new command.
module.exports = new Command(
    // Add command data.
    { name: 'ping', description: 'The ping command.' },
    // Add a function to run when this command is used.
	(interaction) => interaction.reply('Pong!')
);
