import { Client as DJSClient, ClientOptions } from 'discord.js';
import { ClientEvents, ClientConfig, CommandManager, EventManager } from '..';

/**
 * The starting point of a approxi discord bot.
 */
export class Client extends DJSClient {
	/**
	 * The command manager for the client.
	 */
	public commands?: CommandManager;
	/**
	 * The event manager for the client.
	 */
	public events?: EventManager;

	/**
	 * @param options Options for the client.
	 * @param config The client config options.
	 */
	constructor(
		options: ClientOptions = { intents: ['GUILDS'] },
		config?: ClientConfig
	) {
		super(options);

		this.once('ready', () => {
			this.commands = new CommandManager(this, config?.commands);
			this.commands.load();
		});

		this.events = new EventManager(this, config?.events);
		this.events.load();
	}

	/**
	 * @ignore
	 */
	public override on<K extends keyof ClientEvents>(
		eventName: K,
		listener: (...args: ClientEvents[K]) => void
	): this {
		return super.on.call(this, eventName, listener);
	}

	/**
	 * @ignore
	 */
	public override once<K extends keyof ClientEvents>(
		eventName: K,
		listener: (...args: ClientEvents[K]) => void
	): this {
		return super.once.call(this, eventName, listener);
	}

	/**
	 * @ignore
	 */
	public override emit<K extends keyof ClientEvents>(
		eventName: K,
		...args: ClientEvents[K]
	): boolean {
		return super.emit.call(this, eventName, ...args);
	}
}
