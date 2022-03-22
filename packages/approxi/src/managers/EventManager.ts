import glob from 'glob';
import { Client, Event, EventManagerConfig, EventStructure } from '..';

/**
 * The event manager for the client.
 */
export class EventManager {
	/**
	 * The cache of events.
	 */
	public cache: (Event | EventStructure)[] = [];
	/**
	 * The directory where events are located.
	 */
	public location;

	/**
	 * @param client The client that instantiated the manager.
	 */
	constructor(public client: Client, { location = './events' }: EventManagerConfig = {}) {
		this.location = location;
	}

	/**
	 * Load and register events.
	 * @param location
	 */
	public load(location: string = this.location) {
		glob(`${process.cwd()}/${location}/**/*.{js,ts}`, async (error, paths) => {
			if (error) throw error;

			this.cache = [];

			for (const path of paths) {
				const event: Event | EventStructure = (await import(path)).default;

				this.cache.push(event);
			}

			for (const { name, once, run } of this.cache) {
				if (once) {
					this.client.once(name, run);
				} else {
					this.client.on(name, run);
				}
			}

			this.client.emit('eventsLoad', this.cache);
		});
	}
}
