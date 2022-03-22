import { ApplicationCommandDataResolvable, CommandInteraction } from "discord.js";

/**
 * The command builder.
 */
export class Command {
	/**
	 * @param data The command data.
	 * @param run The function to run when the command is ran.
	 */
	constructor(
		public data: ApplicationCommandDataResolvable,
		public run: (interaction: CommandInteraction) => any
	) {}
}
