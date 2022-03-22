import { ClientEvents as DJSEvents, Collection } from 'discord.js';
import { Command, CommandManagerConfig, CommandStructure, Event, EventManagerConfig, EventStructure } from '..';

/**
 * The client's evemts.
 */
export interface ClientEvents extends DJSEvents {
	/**
	 * When the commands have been loaded and registered to discord.
	 */
	commandsLoad: [commands: Collection<string, Command | CommandStructure>];
	eventsLoad: [events: (Event | EventStructure)[]];
}

/**
 * The client config options.
 */
export interface ClientConfig {
	/**
	 * Command manager config options.
	 */
	commands?: CommandManagerConfig;
	/**
	 * Event manager config options.
	 */
	events?: EventManagerConfig;
}
