// Import node modules and config
import Discord from 'discord.js';
import config from './config';

// Import handlers
import muteUnmuteCommandHandler from './handlers/muteUnmuteCommand';
import botReadyHandler from './handlers/botReady';
import guildCreateHandler from './handlers/guildCreate';
import readyToPlayHandler from './handlers/readyToPlay';
import queueHandler from './handlers/queue';
import helpHandler from './handlers/help';

// Types
import type GlobalObject from 'types/GlobalObject';

// Instantiate the discord bot client
//
// Make sure to enable REACTION partials so we can listen for when a reaction is added
//
// https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages
const client = new Discord.Client({ partials: [ 'MESSAGE', 'CHANNEL', 'REACTION', 'USER' ] });

// Tell the client to login to our discord bot using the token given from discord
client.login(config.discord.token);

// When we hit a rate limit. This is temporary to debug anything that comes up.
client.on('rateLimit', (data) => {
  console.log(data);
});

let global: GlobalObject = {
  queue: {},
};

// Run the handlers
muteUnmuteCommandHandler(client, global);
botReadyHandler(client, global);
guildCreateHandler(client, global);
readyToPlayHandler(client, global);
queueHandler(client, global);
helpHandler(client, global);
