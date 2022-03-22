import { ApplicationCommandDataResolvable, CommandInteraction } from "discord.js";

/**
 * Command manager config options.
 */
export interface CommandManagerConfig {
    /**
     * The directory where commands are located.
     */
    location?: string;
    /**
     * Whether to register commands globally.
     */
    global?: boolean;
    /**
     * Guilds to register commands to.
     */
	guilds?: string[];
}

/**
 * The command structure.
 */
export interface CommandStructure {
    /**
     * The command data.
     */
    data: ApplicationCommandDataResolvable;
    /**
     * The function to run when the command is ran.
     * @param interaction The command interaction.
     */
    run: (interaction: CommandInteraction) => any;
}
