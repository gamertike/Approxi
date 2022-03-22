import { ClientEvents, EventStructure } from '..';

/**
 * The event builder.
 */
export class Event<K extends keyof ClientEvents = keyof ClientEvents> {
	/**
	 * The event name.
	 */
	public name;
	/**
	 * Whether the event should run once.
	 */
	public once;

	/**
	 * @param run The function to run when the evemt is emitted.
	 */
	constructor({ name, once = false }: Omit<EventStructure<K>, 'run'>, public run: (...args: ClientEvents[K]) => any) {
		this.name = name;
		this.once = once;
	}
}
