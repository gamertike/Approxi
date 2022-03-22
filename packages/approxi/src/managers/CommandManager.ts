import { ApplicationCommandDataResolvable, Collection, Interaction } from 'discord.js';
import { glob } from 'glob';
import { Client, Command, CommandManagerConfig, CommandStructure } from '../..';

/**
 * The command manager for the client.
 */
export class CommandManager {
	/**
	 * The cache of commands.
	 */
	public cache: Collection<string, Command | CommandStructure> = new Collection();
	/**
	 * The directory where commands are located.
	 */
	public location;
	/**
	 * Whether to register commands globally.
	 */
	public global;
	/**
	 * Guilds to register commands to.
	 */
	public guilds;

	/**
	 * @param client The client that instantiated the manager.
	 */
	constructor(
		public client: Client,
		{ global = true, guilds = [], location = './commands' }: CommandManagerConfig = {}
	) {
		this.global = global;
		this.guilds = guilds;
		this.location = location;
	}

	/**
	 * The command interaction handler function.
	 * @param interaction The command interaction.
	 */
	public async handler(interaction: Interaction) {
		if (!interaction.isCommand()) return;

		const command = this.cache.get(interaction.commandName);

		if (!command) return;

		try {
			await command.run(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	/**
	 * Load and register commands.
	 */
	public async load({
		global = this.global,
		guilds = this.guilds,
		location = this.location,
	}: CommandManagerConfig = {}) {
		glob(`${process.cwd()}/${location}/**/*.{js,ts}`, async (error, paths) => {
			if (error) throw error;

			this.cache.clear();

			for (const path of paths) {
				const command: Command | CommandStructure = (await import(path)).default;

				this.cache.set(command.data.name, command);
			}

			const body = this.getBody();

			if (global) await this.client.application?.commands.set(body);

			for (const guildId of guilds) await this.client.guilds.cache.get(guildId)?.commands.set(body);

			this.client.on('interactionCreate', this.handler.bind(this));

			this.client.emit('commandsLoad', this.cache);
		});
	}

	/**
	 * Get the JSON request body for commands.
	 * @param cache The cache of commands.
	 * @returns JSON request body for commands.
	 */
	public getBody(cache = this.cache): ApplicationCommandDataResolvable[] {
		const body: ApplicationCommandDataResolvable[] = [];

		for (const { data } of cache.values()) body.push(data);

		return body;
	}
}
