import config from '../config';

// Types
import type { Client } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

export default (client: Client, global: GlobalObject) => {
  // When the bot is ready to accept commands
  client.on('ready', () => {
    console.log(`Bot works, bro!`);

    // Set the activity to the configured activity
    client.user.setActivity(config.activityString, { type: 'WATCHING' });
  });
}
