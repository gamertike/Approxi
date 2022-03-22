const { Event } = require('approxi');

// Create a new event.
module.exports = new Event(
	// Add event data.
	{ name: 'ready', once: true },
	// Add a function to run when this event is emitted.
	(client) => console.log(`Logged in as ${client.user.tag}`)
);
