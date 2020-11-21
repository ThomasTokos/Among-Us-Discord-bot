import config from '../config';
import Discord from 'discord.js';

// Utils
import colorUtils from '../utils/color';

// Types
import type { Client } from 'discord.js';
import type { Message, MessageReaction } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

// The description on the embed
const defaultDescription = `React to this message with a ${config.reactionEmoji} to indicate you are ready to play!`;

export default (client: Client, global: GlobalObject) => {
  // Wait for a ping to the bot to send a message
  client.on('message', (message: Message) => {
    // If the message is not a valid command, ignore it
    const validCommands = [
      config.commands.down2play,
      config.commands.d2p,
      `<@!${config.discord.botID}>`,
    ];

    if(!validCommands.includes(message.content)) return;

    const embed = new Discord.MessageEmbed()
      .setColor(`${colorUtils.generateRandomColor()}`)
      .setTitle('Anyone down to play?')
      .setDescription(defaultDescription)
      .setFooter(`I was summoned here by ${message.author.username}`);

    // Send the embed
    message.channel.send(embed)
      .then(embeddedMessage => {
        // Now that the embed is sent, react with a checkmark
        embeddedMessage.react(config.reactionEmoji);
      });
  });

  // When a change in reactions happens, catch it here
  const handleReaction = async (change: 'add' | 'remove', reaction: MessageReaction) => {
    console.log('Running handle reaction');

    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message: ', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    // Pull all the users that reacted down
    await reaction.users.fetch()

    // Get a list of regular usernames (not the bot) that have reacted
    const usernamesThatReacted: string[] = reaction.users.cache.filter(user => {
      if(user.id === config.discord.botID) return false;

      if(!user.username) return false;

      return true;
    }).map((user) => {
      if(user)

      return user.username;
    });

    // The reactions for the "Ready 2 play" emoji
    const readyToPlayReactions = reaction.message.reactions.cache.get(config.reactionEmoji);

    // The number of people who have reacted with the reaction emoji (minus one for the bot)
    let usersReadyToPlay = readyToPlayReactions ? readyToPlayReactions.count - 1 : 0;

    // The string we should update on the embed (ex: "player1, player2, and player3 are ready to play!")
    let usernamesReadyToPlayString = '';

    for(let i = 0; i < usernamesThatReacted.length; i++) {
      const user = usernamesThatReacted[i];

      // if this is the first user, add it to the string
      if(i === 0) {
        usernamesReadyToPlayString += user;

        continue;
      }

      // If this is the last user
      if(i === usernamesThatReacted.length - 1) {
        // Only two items
        if(usernamesThatReacted.length === 2) {
          usernamesReadyToPlayString += ` and ${user}`;

          continue;
        }

        // More than two items
        usernamesReadyToPlayString += `, and ${user}`;

        continue;
      }

      // Any other case, just add the string normally
      usernamesReadyToPlayString += `, ${user}`;
    }

    // The existing embed in the message
    const embed = reaction.message.embeds[0];

    // The new description (default to the default description)
    let newDescription = `${defaultDescription}`;

    // If there are at least one users down to play, set the usernamesThatReacted
    if(usersReadyToPlay > 0) {
      newDescription +=  `\n\n ${usernamesReadyToPlayString} (${usersReadyToPlay} player${usersReadyToPlay === 1 ? '' : 's'}) ${usersReadyToPlay === 1 ? 'is' : 'are'} ready to play!`
    }

    embed?.setDescription(newDescription)

    reaction?.message?.edit(embed)
  }

  client.on('messageReactionRemove', async (reaction) => handleReaction('remove', reaction));

  client.on('messageReactionAdd', async (reaction) => handleReaction('add', reaction));
}
