import { ClientEvents } from '..';

/**
 * Event manager config options.
 */
export interface EventManagerConfig {
	/**
	 * The directory where events are located.
	 */
	location?: string;
}

/**
 * The event structure.
 */
export interface EventStructure<K extends keyof ClientEvents = keyof ClientEvents> {
	/**
	 * The event name.
	 */
	name: K;
	/**
	 * Whether the event should run once.
	 */
	once?: boolean;
	/**
	 * The function to run when the evemt is emitted.
	 */
	run: (...args: ClientEvents[K]) => any;
}
