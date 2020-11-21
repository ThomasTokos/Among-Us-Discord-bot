import config from '../config';
import Discord from 'discord.js';

// Utils
import colorUtils from '../utils/color';

// Types
import type { Client } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

export default (client: Client, global: GlobalObject) => {

  client.on('message', message => {
    // Make sure the message's content is a valid command
    const validCommands = [
      config.commands.help
    ];

    /*
    Might use this later idk
    
    const defaultDescription = '**Mute Commands** ';

        const embed = new Discord.MessageEmbed()
          .setColor(`${colorUtils.generateRandomColor()}`)
          .setTitle('Admin Table Help Commands')
          .setDescription('**Mute Commands** \n !um')
          .setFooter(`A bot made for Amoung Us with love.`);
    */

    if(!validCommands.includes(message.content)) return;

    // The person who sent the message.
    const messageAuthorID: string = message.author.id;

    client.users.cache.get(messageAuthorID).send(`
      **Mute Commands**\n
      1. !m *mutes all players in the current voice channel. Admin Only*.\n
      2. !um *unmutes all players in the current voice channel. Admin Only*.\n
      **Down To Play**\n
      1. !down2play *runs the down2play command. It will create a message in that channel asking users if they want to play.*\n
      **Queue**\n
      1. !queue *Enters you into the queue, when a lobby has max 10 players you enter the queue. This is useful for bigger groups.*\n
      2. !nextInqueue *Selects the next person in the queue. Admin only*
    `);
})}
