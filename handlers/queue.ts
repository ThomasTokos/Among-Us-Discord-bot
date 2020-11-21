import config from '../config';

// Utils
import queueUtils from '../utils/queue';

// Types
import type { Client } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

export default (client: Client, global: GlobalObject) => {
  // When a new message comes in, check to see if it's a user queue command
  client.on('message', message => {
    if(message.content !== config.commands.queue) return;

    // The message author
    const messageAuthorID: string = message.author.id;

    // The current guild queue
    const queue: string[] = queueUtils.getQueueForGuild({ guildID: message.guild.id, global });

    // If the user is already in the queue, let them know
    if(queue.includes(messageAuthorID)) return message.reply(`you're already in the queue. ${queue.length} users are queued.`);

    // Add the user to the queue
    queue.push(messageAuthorID);

    // Let the user know they have been added to the queue
    message.reply(`you've been added to the queue. You will recieve a DM and a ping when your turn it up! ${queue.length} users are now queued.`);
  });

  // Check for the admin's next in queue command
  client.on('message', message => {
    // Make sure the message content is the next in queue command
    if(message.content !== config.commands.nextInQueue) return;

    // The current guild queue
    const queue: string[] = queueUtils.getQueueForGuild({ guildID: message.guild.id, global });

    // The discord ID of the next user in queue and remove it from the queue
    const nextUserIDInQueue = queue.shift();

    // If nobody is next in line, then respond with an error.
    if(!nextUserIDInQueue) return message.reply('No users are currently queued.');

    // Get the emoji we're using in the message
    const emoji = client.emojis.cache.get('760145329995120701')

    client.users.cache.get(nextUserIDInQueue).send(`You're up! Hop in the voice call to claim your spot. ${emoji}`);

    message.channel.send(`<@${nextUserIDInQueue}>, you're up! Hop in the voice call to claim your spot. ${queue.length} users are still queued.`);
  });
}
