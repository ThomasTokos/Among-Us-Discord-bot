import config from '../config';

// Types
import type { Client } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

export default (client: Client, global: GlobalObject) => {
  // When was the last command executed at (EPOCH time)
  let lastCommandExecutedAt: number = 0;

  // How many seconds must the user wait between commands
  //
  // This should always be five, since that is how long it usually takes for Discord's rate limiting to reset
  const commandTimeoutInSeconds: number = 5;

  // Run when a message is sent
  client.on('message', message => {
    // Make sure the message's content is a valid command
    const validCommands = [
      config.commands.muteAll,
      config.commands.unmuteAll,
    ];

    if(!validCommands.includes(message.content)) return;

    // The message sender must be an allowed discord user ID
    if(!config.discord.adminIDs.includes(message.author.id)) return;

    // If the message author is not in a voice channel, error out
    if(!message.member.voice.channel) return message.reply('You must join a voice channel before issuing commands.');

    // Get the voice channel the message sender is currently in
    const voiceChannel = message.guild.channels.cache.get(message.member.voice.channel.id);

    // The discord message's text content
    const messageContent = message.content;

    // Mute or unmute all users of a channel
    const changeMuteStatusOfAllUsers = (muteState: boolean) => {
      // Save the last command executed at
      lastCommandExecutedAt = new Date().getTime();

      voiceChannel.members.forEach(member => {
        member.voice.setMute(muteState);
      });
    }

    // The current time
    const currentTime = new Date().getTime();

    // If the last command PLUS the timeout ms is greater than the current time, then the user has not waited the timeout seconds
    if(lastCommandExecutedAt + commandTimeoutInSeconds * 1000 > currentTime) return message.reply(`You must wait ${commandTimeoutInSeconds} seconds`);

    switch(messageContent) {
      // Mute all command handler
      case config.commands.muteAll: {
        changeMuteStatusOfAllUsers(true);

        break;
      };
      // Unmute all command handler
      case config.commands.unmuteAll: {
        changeMuteStatusOfAllUsers(false);

        break;
      };
      default: {
        break;
      };
    };
  });
}
